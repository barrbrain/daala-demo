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

var quant_table = [
16, 16, 18, 21, 24, 28, 32, 36,
16, 17, 20, 21, 24, 27, 31, 35,
18, 20, 24, 25, 27, 31, 33, 38,
21, 21, 25, 28, 30, 34, 37, 42,
24, 24, 27, 30, 34, 38, 43, 49,
28, 27, 31, 34, 38, 44, 50, 58,
32, 31, 33, 37, 43, 50, 58, 68,
36, 35, 38, 42, 49, 58, 68, 78];

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

var last_dc = 0;
function bitrate(x, cg) {
  x = x | 0;
  var i = 0, z = 0, K_n = 0, c = 0, E_run = 0, E_yn = 0, y = 0;
  c += signedCode(I4[x]-last_dc); // DC-delta
  last_dc = I4[x];
  for (i = 1; i < 64; i++) {
    y = Math.abs(I4[x + zigzag[64-i]]);
    if (y == 0) {
      z++;
      if (K_n > i) {
        E_yn = K_n / i | 0;
        c += signedCode(y - E_yn); // Explicit zero
      }
    } else {
      c++; // Sign
      K_n = K_n + y;
      if (y == K_n) continue; // Last symbol has P(1)
      E_yn = K_n / i | 0;
      c += signedCode(y - E_yn);
      if (K_n <= i) {
        E_run = i / K_n | 0;
        c += signedCode(z - E_run);
      }
      z = 0;
    }
  }
  c += 63 - 2 * Math.clz32(cg+1); // Gain
  return c|0;
}

function pvq8x8(x, scale) {
  var total = 0, total_sq = 0, rounded = 0, target = 0;
  var i = 0, l = 0, v = 0;
  var dg = 1.;
  var bitcount = 0;
  var cg = 0;
  I4[x] = Math.round(I4[x] * 16 / scale);
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k] * 16 / quant_table[k])|0;
    total += Math.abs(v);
    total_sq += v * v;
    I4[x+k] = v;
  }
  if (total == 0) return;
  cg = Math.round(Math.sqrt(total_sq) * 16 / scale) | 0;
  target = cg / total;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k]*target)|0;
    rounded += v * v;
    I4[x+k] = v;
  }
  bitcount = bitrate(x, cg);
  dg = Math.sqrt(total_sq) / Math.sqrt(rounded);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    v = Math.round(v*dg)|0;
    I4[x+k] = v * quant_table[k] >> 4;
  }
  I4[x] = I4[x] * scale >> 4
  return bitcount|0;
}

function quantize(w, h, scale) {
  w = w | 0;
  h = h | 0;
  var i = 0, j = 0, p = imageptr, v = 0, k = 0, l = 0, q = 0;
  var buf = imageptr + (w*h*3)<<2;
  var bitcount = 0;
  last_dc = 0;
  for (i = 0; i < h * 3; i += 8) {
    for (j = 0; j < w; j += 8) {
      dct.od_bin_fdct8x8(buf, 8, (p + j) << 2, w, tempptr);
      bitcount += pvq8x8(buf>>2, scale);
      dct.od_bin_idct8x8((p + j) << 2, w, buf, 8, tempptr);
    }
    p += 8 * w;
  }
  return bitcount;
}

var config = {
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
  var bitcount = quantize(w, h, config.scale);
  if (config.lapping) {
    filter.unlaphorz(imageptr, w, h, tempptr);
    filter.unlapvert(imageptr, w, h);
  }
  if (config.strength > 0) {
    var dering_tables = imageptr + ((w * h * 3) << 2) | 0;
    dering.dering_image(imageptr, w, h, config.scale*config.strength>>4, dering_tables);
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
  update_image();
};
