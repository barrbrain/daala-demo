self.HEAP = new ArrayBuffer(128*1024*1024);
self.I4 = new Int32Array(HEAP);
self.tempptr = 0;
self.imageptr = (8*8)<<2;

importScripts('filter.js', 'dct.js', 'dering.js');

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
    outbuf[i*4] = r >> 4;
    outbuf[i*4+1] = g >> 4;
    outbuf[i*4+2] = b >> 4;
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

var qm = new Int16Array(64);
var qm_inv = new Int16Array(64);
function init_qm() {
  var i = 0, j = 0;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      qm[i * 8 + j] = Math.round((1 << 15) * (config.lapping ? MAG8[i] * MAG8[j] : 1.) / M4[i * 8 + j]);
      qm_inv[i * 8 + j] = Math.round((1 << 23) / qm[i * 8 + j]);
    }
  }
  qm[0] = 1 << 11;
  qm_inv[0] = 1 << 12;
}

var zigzag = [
 0,  1,  8,  9,  2, 16, 10,  3,
17, 24, 11, 25, 18, 19, 26, 27,
32, 40, 33, 48, 41, 56, 49, 57,
 4,  5, 12,  6, 13,  7, 14, 15,
20, 34, 21, 28, 35, 42, 29, 22,
36, 43, 23, 50, 30, 37, 58, 44,
51, 31, 45, 59, 38, 52, 39, 46,
60, 53, 47, 61, 54, 55, 62, 63];

function signedCode(x) {
  x = x | 0;
  x = (x << 1) ^ (x >> 31);
  return 63 - 2 * Math.clz32(x + 1);
}

function lenDcDelta(x) {
  x = x | 0;
  var i = 0;
  if (x == 0) return 2;
  i = 32 - Math.clz32(Math.abs(x));
  return i < 6 ? 3 + i : 2 * i - 2;
}

var last_dc = 0;
var last_qg = 0;
function bitrate(x, qg) {
  x = x | 0;
  var i = 0, z = 0, K_n = 0, c = 0, E_run = 0, E_yn = 0, y = 0;
  c += lenDcDelta(I4[x]-last_dc); // DC-delta
  last_dc = I4[x];
  c += signedCode(qg-last_qg) // Gain
  last_qg = qg;
  if (qg == 0) return c|0;
  for (i = 1; i < 64; i++) {
    y = Math.abs(I4[x + zigzag[64-i]]);
    if (y == 0) {
      z++;
      if (K_n > i) {
        E_yn = Math.round(K_n / i) | 0;
        c += signedCode(y - E_yn); // Explicit zero
        z = 0;
      }
    } else {
      c++; // Sign
      K_n = K_n + y;
      if (y == K_n) continue; // Last symbol has P(1)
      E_yn = Math.round(K_n / i) | 0;
      c += signedCode(y - E_yn);
      if (K_n <= i) {
        E_run = Math.round(i / K_n) | 0;
        c += signedCode(z - E_run);
      }
      z = 0;
    }
  }
  return c|0;
}

function usq8x8(x, scale) {
  var bitcount = 0;
  var v = 0, k = 0;
  var total = 0;
  var scale_inv = Math.round((1 << 16) / scale)|0;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k] * qm_inv[k] * scale_inv / (1 << 28));
    total += Math.abs(v);
    I4[x+k] = v;
  }
  bitcount = bitrate(x, total);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    I4[x+k] = v * qm[k] * scale >> 11;
  }
  return bitcount|0;
}

function pvq8x8(x, scale) {
  var total = 0, total_sq = 0, rounded = 0, target = 0;
  var i = 0, l = 0, v = 0;
  var dg = 1.;
  var bitcount = 0;
  var qg = 0, g = 0, k = 0;
  for (k = 1; k < 64; k++) {
    v = I4[x+k] * qm_inv[k] >> 12;
    total += Math.abs(v);
    total_sq += v * v;
    I4[x+k] = v;
  }
  qg = Math.round(Math.sqrt(total_sq) / scale) | 0;
  g = qg * scale;
  if (qg == 0) {
    for (k = 1; k < 64; k++) {
      I4[x+k] = 0;
    }
    bitcount = bitrate(x, qg);
    return bitcount|0;
  }
  target = Math.round((qg - 0.2) * Math.sqrt(33)) / total;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k]*target)|0;
    rounded += v * v;
    I4[x+k] = v;
  }
  bitcount = bitrate(x, qg);
  dg = g / Math.sqrt(rounded);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    v = Math.round(v*dg)|0;
    I4[x+k] = v * qm[k] >> 11;
  }
  return bitcount|0;
}

function quantize(w, h, scale, method) {
  w = w | 0;
  h = h | 0;
  var i = 0, j = 0, p = imageptr>>2, v = 0, k = 0, l = 0, q = 0;
  var buf = imageptr + ((w*h*3)<<2);
  var bitcount = 0;
  last_dc = 0;
  last_qg = 0;
  init_qm();
  for (i = 0; i < h * 3; i += 8) {
    for (j = 0; j < w; j += 8) {
      dct.od_bin_fdct8x8(buf, 8, (p + j) << 2, w, tempptr);
      bitcount += method == 'pvq' ? pvq8x8(buf>>2, scale) : usq8x8(buf>>2, scale);
      dct.od_bin_idct8x8((p + j) << 2, w, buf, 8, tempptr);
    }
    p += 8 * w;
  }
  return bitcount;
}

var config = {
  method: 'pvq',
  scale: 409,
  strength: 1.0,
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
  var ts = new Date();
  if (config.lapping) {
    filter.lapvert(imageptr, w, h);
    filter.laphorz(imageptr, w, h, tempptr);
  }
  var bitcount = quantize(w, h, config.scale, config.method);
  if (config.lapping) {
    filter.unlaphorz(imageptr, w, h, tempptr);
    filter.unlapvert(imageptr, w, h);
  }
  if (config.strength > 0) {
    var dering_tables = imageptr + ((w * h * 3) << 2) | 0;
    dering.dering_image(imageptr, w, h, config.scale*config.strength, dering_tables);
  }
  var timing = new Date() - ts;
  var data = new ArrayBuffer(w*h*4);
  ycgco2rgb(imagebuffer, new Uint8ClampedArray(data), w*h);
  postMessage({image: {width: w, height: h, data: data}, timing: timing, bits: bitcount}, [data]);
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
  if ('method' in message) {
    config.method = message.method;
  }
  update_image();
};
