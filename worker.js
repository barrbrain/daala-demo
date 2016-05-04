self.HEAP = new ArrayBuffer(16*1024*1024);
self.I4 = new Int32Array(HEAP);
self.I2 = new Int16Array(HEAP);
self.F8 = new Float64Array(HEAP);
self.block_buf = 0;
self.pvq_in = self.block_buf + ((8*8)<<2);
self.pvq_out = self.pvq_in + ((8*8)<<2);
self.pvq_buf = self.pvq_out + ((8*8)<<2);
self.qm_ptr = self.pvq_buf + 3000;
self.qm_inv_ptr = self.qm_ptr + (64<<1);
self.pvq_theta_out = self.qm_inv_ptr + (64<<1);
self.imageptr = self.pvq_theta_out + 24+(64<<2)+(64<<2);

importScripts('filter.js', 'dct.js', 'dering.js', 'pvq_encoder.js');


function rgb2ycgco(inbuf, outbuf, pixels) {
  var y, cg, co;
  var i = 0;
  while (i < pixels) {
    y = (inbuf[i*4] + 2 * inbuf[i*4+1] + inbuf[i*4+2])*4;
    cg = (-inbuf[i*4] + 2 * inbuf[i*4+1] - inbuf[i*4+2])*4;
    co = (inbuf[i*4] - inbuf[i*4+2])*8;
    outbuf[i] = y;
    outbuf[i+1*pixels] = cg;
    outbuf[i+2*pixels] = co;
    i = i+1;
  }
}

function ycgco2rgb(inbuf, outbuf, pixels) {
  var r, g, b, t;
  var i = 0;
  while (i < pixels) {
    t = inbuf[i] - inbuf[i+pixels];
    r = t + inbuf[i+2*pixels];
    g = inbuf[i] + inbuf[i+pixels];
    b = t - inbuf[i+2*pixels];
    outbuf[i*4] = (r+8) >> 4;
    outbuf[i*4+1] = (g+8) >> 4;
    outbuf[i*4+2] = (b+8) >> 4;
    outbuf[i*4+3] = 0xff;
    i = i+1;
  }
}

var MAG8 = [
  0.936496, 0.892830, 0.938452, 0.970087,
  0.974272, 0.967954, 0.974035, 0.990480
];

var M4 = [
16, 16, 18, 21, 24, 28, 32, 36,
16, 17, 20, 21, 24, 27, 31, 35,
18, 20, 24, 25, 27, 31, 33, 38,
21, 21, 25, 28, 30, 34, 37, 42,
24, 24, 27, 30, 34, 38, 43, 49,
28, 27, 31, 34, 38, 44, 50, 58,
32, 31, 33, 37, 43, 50, 58, 68,
36, 35, 38, 42, 49, 58, 68, 78];

var zigzag = new Int8Array([
 0,  1,  8,  9,  2, 16, 10,  3,
17, 24, 11, 25, 18, 19, 26, 27,
32, 40, 33, 48, 41, 56, 49, 57,
 4,  5, 12,  6, 13,  7, 14, 15,
20, 34, 21, 28, 35, 42, 29, 22,
36, 43, 23, 50, 30, 37, 58, 44,
51, 31, 45, 59, 38, 52, 39, 46,
60, 53, 47, 61, 54, 55, 62, 63]);

var qm = I2.subarray(qm_ptr>>1,(qm_ptr>>1)+64);
var qm_inv = I2.subarray(qm_inv_ptr>>1,(qm_inv_ptr>>1)+64);
var zigzag_inv = new Int8Array(64);
function init_qm() {
  var i = 0, j = 0;
  for (i = 0; i < 64; i++) {
    zigzag_inv[zigzag[i]] = i;
  }
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      qm[zigzag_inv[i * 8 + j]] = Math.floor(.5+ (1 << 19) * (config.lapping ? MAG8[i] * MAG8[j] : 1.) / M4[i * 8 + j]);
      qm_inv[zigzag_inv[i * 8 + j]] = Math.floor(.5+ (1 << 27) / qm[zigzag_inv[i * 8 + j]]);
    }
  }
  qm[0] = 1 << 15;
  qm_inv[0] = 1 << 12;
}

function lenDcDelta(x) {
  x = x | 0;
  var i = 0;
  if (x == 0) return 2;
  i = 32 - Math.clz32(Math.abs(x))|0;
  return i < 6 ? 3 + i : (i << 1) - 2;
}

function lenMag(x) {
  return lenDcDelta((x>>1)^(-(x&1)));
}

// ceil(log2(k+n-1 choose n-1))
function weakCompositionEntropy(k, n) {
  k=k|0;
  n=n|0;
  var x=0.,t=0.08106146679532733;
  x=+((k+n)|0);
  t+=(x-.5)*+Math.log(x)+1./(12.*x);
  x=+((k+1)|0);
  t-=(x-.5)*+Math.log(x)+1./(12.*x);
  x=+(n|0);
  t-=(x-.5)*+Math.log(x)+1./(12.*x);
  return ~~+Math.ceil(t/Math.LN2)|0;
}

var last_dc = 0;
var last_qg = 0;
function bitrate(x, qg, k) {
  x = x | 0;
  var i = 0, c = 0;
  c += lenDcDelta(I4[x]-last_dc); // DC-delta
  last_dc = I4[x];
  c += lenDcDelta(qg-last_qg); // Gain-delta
  last_qg = qg;
  if (qg == 0) return c|0; // Skip
  c += weakCompositionEntropy(k, 63); // Shape
  for (i = 1; i < 64; i++) c += !!I4[x+i]; // Signs
  return c|0;
}

function usq8x8(x, scale) {
  var bitcount = 0;
  var v = 0, k = 0;
  var total = 0;
  var scale_inv = Math.floor(.5+ (1 << 16) / scale)|0;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k] * qm_inv[zigzag_inv[k]] * scale_inv / (1 << 28));
    total += Math.abs(v);
    I4[x+k] = v;
  }
  bitcount += bitrate(x, total, total);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    I4[x+k] = v * qm[zigzag_inv[k]] * scale >> 15;
  }
  return bitcount|0;
}

var OD_BAND_OFFSETS8 = new Int8Array([1, 16, 24, 32, 64]);

var stats;

function pvq8x8(x, scale, beta, pli, cfl) {
  var bitcount = 0, k = 0, v = 0;
  var robust = 1, keyframe = 1;
  var q0 = Math.round(scale / beta)|0;
  var y = pvq_out>>2;
  var skip_diff = pvq_theta_out;
  var itheta = pvq_theta_out + 8;
  var max_theta = pvq_theta_out + 12;
  var vk = pvq_theta_out + 16;
  var r0 = pvq_theta_out + 24;
  var y_pulse = pvq_theta_out+24+(64<<2);
  var cg = 0, off = 0, size = 0, b = 0;

  bitcount += lenDcDelta(I4[x]-last_dc); // DC-delta
  last_dc = I4[x];

  if (pli == 0) {
    for (k = 0; k < 64; k++) {
      I4[(r0>>2)+k] = 0;
    }
  }
  if (pli == 1 && cfl) {
    for (k = 0; k < 64; k++) {
      I4[(r0>>2)+k] = I4[y+k];
    }
  }
  for (k = 0; k < 64; k++) {
    I4[y+k] = I4[x+zigzag[k]];
  }
  for (k = 1; k < 64; k++) {
    v = I4[y+k];
    I4[x+k] = v;
  }

  for (b = 0; b <= 6; b++) {
  beta = 1. + b / 12.;
  for (q0 = 421; q0 <= 814; q0++) {
  F8[skip_diff>>3] = 0.;
  for (k = 0; k < 4; k++) {
    off = OD_BAND_OFFSETS8[k];
    size = OD_BAND_OFFSETS8[k+1]-off;
    bitcount = stats[k][q0*16+b]|0;
    cg = pvq_encoder.od_pvq_theta((y+off)<<2, (x+off)<<2, r0+(off<<2),
      size, q0, y_pulse, itheta, max_theta, vk,
      beta, skip_diff, robust, keyframe, pli,
      qm_ptr + (off<<1), qm_inv_ptr + (off<<1), pvq_buf);
    bitcount += lenMag(cg); // Gain
    if (pli > 0) { // Only predict CfL
      bitcount += lenMag(1 + I4[itheta>>2]); // Theta
    }
    if (I4[itheta>>2] != -1) {
      bitcount += weakCompositionEntropy(I4[vk>>2], size - 1); // Shape
    } else if (cg != 0) {
      bitcount += weakCompositionEntropy(I4[vk>>2], size); // Shape
    }
    for (; size > 0; off++, size--) bitcount += !!I4[y+off]; // Signs
    stats[k][q0*16+b] = bitcount;
  }
  }
  }

  return bitcount|0;
}

function quantize(w, h, scale, method) {
  w = w | 0;
  h = h | 0;
  var i = 0, j = 0, p = imageptr>>2, pli = 0;
  var bitcount = 0;
  last_dc = 0;
  last_qg = 0;
  for (i = 0; i < h; i += 8) {
    for (j = 0; j < w; j += 8) {
      for (pli = 0; pli < 1; pli++) {
        dct.od_bin_fdct8x8(pvq_in, 8, (pli*w*h + p + j) << 2, w, block_buf);
        bitcount += method == 'pvq' ? pvq8x8(pvq_in>>2, scale, config.beta, pli, config.cfl) : usq8x8(pvq_in>>2, scale);
      }
    }
    p += 8 * w;
  }
  return bitcount;
}

var config = {
  method: 'pvq',
  scale: 421,
  beta: 1.5,
  cfl: true,
  strength: 0.5,
  lapping: true
};

var imagedata;
var imagebuffer;

function recv_image(newImage) {
  var w = newImage.width;
  var h = newImage.height;
  imagedata = new ImageData(new Uint8ClampedArray(newImage.data), w, h);
  imagebuffer = I4.subarray(imageptr>>2, (imageptr>>2) + w * h * 3);
}

function update_image() {
  if (!imagedata) return;
  var w = imagedata.width;
  var h = imagedata.height;
  rgb2ycgco(imagedata.data, imagebuffer, w*h);
  I4.fill(0,0,self.imageptr>>2);
  pvq_encoder.init_tables(self.pvq_buf);
  init_qm();
  var ts = new Date();
  if (config.lapping) {
    filter.lapvert(imageptr, w, h);
    filter.laphorz(imageptr, w, h, block_buf);
  }
  stats = [new Float64Array(16*1024), new Float64Array(16*1024), new Float64Array(16*1024), new Float64Array(16*1024)];
  quantize(w, h, config.scale, config.method);
  var timing = new Date() - ts;
  postMessage({timing: timing, stats:stats});
}

onmessage = function(e) {
  var message = e.data;
  if ('image' in message) {
    recv_image(message.image);
  }
  if ('lapping' in message) {
    config.lapping = message.lapping;
  }
  if ('strength' in message) {
    config.strength = message.strength;
  }
  if ('scale' in message) {
    config.scale = message.scale;
  }
  if ('beta' in message) {
    config.beta = message.beta;
  }
  if ('cfl' in message) {
    config.cfl = message.cfl;
  }
  if ('method' in message) {
    config.method = message.method;
  }
  update_image();
};
