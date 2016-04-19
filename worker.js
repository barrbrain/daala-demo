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
      qm[i * 8 + j] = Math.floor(.5+ (1 << 15) * (config.lapping ? MAG8[i] * MAG8[j] : 1.) / M4[i * 8 + j]);
      qm_inv[i * 8 + j] = Math.floor(.5+ (1 << 23) / qm[i * 8 + j]);
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

function lenDcDelta(x) {
  x = x | 0;
  var i = 0;
  if (x == 0) return 2;
  i = 32 - Math.clz32(Math.abs(x))|0;
  return i < 6 ? 3 + i : (i << 1) - 2;
}

var last_dc = 0;
var last_qg = 0;
function bitrate(x, qg, k) {
  x = x | 0;
  var i = 0, z = 0, K_n = 0, c = 0, E_run = 0, E_yn = 0, y = 0;
  c += lenDcDelta(I4[x]-last_dc); // DC-delta
  last_dc = I4[x];
  c += lenDcDelta(qg-last_qg) // Gain
  last_qg = qg;
  if (qg == 0) return c|0;
  c = c + 63 * Math.log2(1 + Math.log(63 * 2) * k / 63)|0; // PVQ estimate
  return c|0;
}

function usq8x8(x, scale) {
  var bitcount = 0;
  var v = 0, k = 0;
  var total = 0;
  var scale_inv = Math.floor(.5+ (1 << 16) / scale)|0;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k] * qm_inv[k] * scale_inv / (1 << 28));
    total += Math.abs(v);
    I4[x+k] = v;
  }
  bitcount = bitrate(x, total, total);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    I4[x+k] = v * qm[k] * scale >> 11;
  }
  return bitcount|0;
}

const pvqbuf = new Float64Array(64);
const pvqout = new Int32Array(64);
const pvqin = new Int32Array(64);
function pvq_search(k) {
 k = k | 0;
 var i = 0, xy = 0.0, j = 0, yy = 0.0, txy = 0.0, tyy = 0.0, bxy = 0.0, byy = 0.0, h = 0, better = 0;
 i = 0;
 do {
  pvqbuf[i] = +Math.abs(+(+(pvqin[i] | 0)));
  i = i + 1 | 0;
 } while ((i | 0) != 63);
 i = 0;
 xy = 0.0;
 do {
  xy = xy + +pvqbuf[i];
  i = i + 1 | 0;
 } while ((i | 0) != 63);
 txy = 1.0 / xy;
 tyy = +(k | 0);
 i = 0;
 j = 0;
 xy = 0.0;
 yy = 0.0;
 do {
  byy = +pvqbuf[j];
  h = ~~+Math.floor(+(txy * (tyy * byy)));
  pvqout[j] = h;
  xy = xy + byy * +(h | 0);
  yy = yy + +(Math.imul(h, h) | 0);
  i = h + i | 0;
  j = j + 1 | 0;
 } while ((j | 0) != 63);
 if ((i | 0) < (k | 0)) while (1) {
  bxy = -10.0;
  byy = 1.0;
  h = 0;
  j = 0;
  while (1) {
   txy = xy + +pvqbuf[h];
   tyy = yy + +(pvqout[h] << 1 | 0) + 1.0;
   txy = txy * txy;
   if (!h) better = 1; else if (byy * txy > bxy * tyy) better = 1; else {
    txy = bxy;
    tyy = byy;
   }
   if (better) {
    better = 0;
    j = h;
   }
   h = h + 1 | 0;
   if ((h | 0) == 63) break; else {
    bxy = txy;
    byy = tyy;
   }
  }
  xy = xy + +pvqbuf[j];
  h = j;
  j = pvqout[h] | 0;
  pvqout[h] = j + 1;
  i = i + 1 | 0;
  if ((i | 0) == (k | 0)) {
   i = 0;
   break;
  } else yy = yy + +(j << 1 | 0) + 1.0;
 } else i = 0;
 do {
  if ((pvqin[i] | 0) < 0) {
   pvqout[i] = 0 - (pvqout[i] | 0);
  }
  i = i + 1 | 0;
 } while ((i | 0) != 63);
 return;
}

function pvq8x8(x, scale, beta) {
  var total = 0, total_sq = 0, rounded = 0, target = 0;
  var i = 0, l = 0, v = 0;
  var dg = 1.;
  var bitcount = 0;
  var qg = 0, g = 0, k = 0;
  for (k = 1; k < 64; k++) {
    v = I4[x+k] * qm_inv[k] >> 12;
    total_sq += v * v;
    pvqin[k - 1] = v;
  }
  qg = ~~+Math.floor(.5+ 4096 * Math.pow(Math.sqrt(total_sq) / 4096, 1. / beta) / scale / beta);
  g = ~~+Math.floor(.5+ 4096 * Math.pow(qg * beta * scale / 4096, beta));
  if (qg == 0) {
    for (k = 1; k < 64; k++) {
      I4[x+k] = 0;
    }
    bitcount = bitrate(x, qg, qg);
    return bitcount|0;
  }
  target = ~~+Math.floor(.5+ (qg - (1 - 3 / Math.sqrt(33))) * Math.sqrt(33));
  pvq_search(target);
  for (k = 1; k < 64; k++) {
    v = pvqout[k - 1]
    rounded += v * v;
    I4[x+k] = v;
  }
  bitcount = bitrate(x, qg, target);
  dg = g / Math.sqrt(rounded);
  for (k = 1; k < 64; k++) {
    v = pvqout[k - 1];
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
    var beta = i < h ? config.beta : 1.;
    for (j = 0; j < w; j += 8) {
      dct.od_bin_fdct8x8(buf, 8, (p + j) << 2, w, tempptr);
      bitcount += method == 'pvq' ? pvq8x8(buf>>2, scale, beta) : usq8x8(buf>>2, scale);
      dct.od_bin_idct8x8((p + j) << 2, w, buf, 8, tempptr);
    }
    p += 8 * w;
  }
  return bitcount;
}

var config = {
  method: 'pvq',
  scale: 421,
  beta: 1.5,
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
    dering.dering_image(imageptr, w, h, ~~+config.scale*Math.pow(config.strength, 0.84182), dering_tables);
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
  if ('beta' in message) {
    config.beta = message.beta;
  }
  if ('method' in message) {
    config.method = message.method;
  }
  update_image();
};
