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
    i = i+1;
  }
}
var dering_map = [0, 0.5, 0.707, 1, 1.41, 2];
var cq_map = [0x0000,
0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000F,
0x0011, 0x0013, 0x0015, 0x0018, 0x001B, 0x001E,
0x0021, 0x0024, 0x0029, 0x002E, 0x0034, 0x003A,
0x0041, 0x0048, 0x0051, 0x005A, 0x0064, 0x0070,
0x007D, 0x008C, 0x009C, 0x00AE, 0x00C3, 0x00D9,
0x00F3, 0x010F, 0x012F, 0x0152, 0x0179, 0x01A5,
0x01D6, 0x020D, 0x0249, 0x028E, 0x02DA, 0x032E,
0x038D, 0x03F7, 0x046D, 0x04F0, 0x0583, 0x0627,
0x06De, 0x07AA, 0x088E, 0x098D, 0x0AA9, 0x0BE6,
0x0D48, 0x0ED3, 0x108C, 0x1278, 0x149D, 0x1702,
0x19AE, 0x1CAA, 0x1FFF];
var quant_table = [
16, 16, 18, 21, 24, 28, 32, 36,
16, 17, 20, 21, 24, 27, 31, 35,
18, 20, 24, 25, 27, 31, 33, 38,
21, 21, 25, 28, 30, 34, 37, 42,
24, 24, 27, 30, 34, 38, 43, 49,
28, 27, 31, 34, 38, 44, 50, 58,
32, 31, 33, 37, 43, 50, 58, 68,
36, 35, 38, 42, 49, 58, 68, 78];
function pvq8x8(x, scale) {
  var total = 0, total_sq = 0, rounded = 0, target = 0;
  var i = 0, l = 0, v = 0;
  var dg = 1.;
  I4[x] = Math.round(I4[x] * 16 / scale) * scale >> 4;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k] * 16 / quant_table[k])|0;
    total += Math.abs(v);
    total_sq += v * v;
    I4[x+k] = v;
  }
  if (total == 0) return;
  target = Math.round(Math.sqrt(total_sq) * 16 / scale) / total;
  for (k = 1; k < 64; k++) {
    v = Math.round(I4[x+k]*target)|0;
    rounded += v * v;
    I4[x+k] = v;
  }
  dg = Math.sqrt(total_sq) / Math.sqrt(rounded);
  for (k = 1; k < 64; k++) {
    v = I4[x+k];
    v = Math.round(v*dg)|0;
    I4[x+k] = v * quant_table[k] >> 4;
  }
}
function quantize(w, h, scale) {
  w = w | 0;
  h = h | 0;
  var i = 0, j = 0, p = imageptr, v = 0, k = 0, l = 0, q = 0;
  var buf = imageptr + (w*h*3)<<2;
  for (i = 0; i < h * 3; i += 8) {
    for (j = 0; j < w; j += 8) {
      dct.od_bin_fdct8x8(buf, 8, (p + j) << 2, w, tempptr);
      pvq8x8(buf>>2, scale);
      dct.od_bin_idct8x8((p + j) << 2, w, buf, 8, tempptr);
    }
    p += 8 * w;
  }
}
var config = {
  scale: 409,
  strength: 1.0,
  lapping: true
};
var imagedata;
var imagebuffer;
function init_image() {
  var canvas = document.getElementById('canvas');
  var srcimage = document.getElementById('srcimage');
  var w = srcimage.width;
  var h = srcimage.height;
  if (w * h > 4096 * 2169) {
    var scale = 4096.0 * 2169.0 / (w * h);
    w = w * scale | 0;
    h = h * scale | 0;
    w = w - (w & 7);
    h = h - (h & 7);
  }
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(srcimage, 0, 0, srcimage.width, srcimage.height, 0, 0, w, h);
  window.imagedata = ctx.getImageData(0, 0, w, h);
  window.imagebuffer = window.I4.subarray(imageptr>>2, (imageptr>>2) + w * h * 3);
  update_image();
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
  quantize(w, h, config.scale);
  if (config.lapping) {
    filter.unlaphorz(imageptr, w, h, tempptr);
    filter.unlapvert(imageptr, w, h);
  }
  if (config.strength > 0) {
    var dering_tables = imageptr + ((w * h * 3) << 2) | 0;
    dering.dering_image(imageptr, w, h, config.scale*config.strength>>4, dering_tables);
  }
  document.getElementById('status').innerText = 'Applied all filters in ' + (new Date() - ts) + ' ms.';
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var imageout = ctx.getImageData(0, 0, w, h)
  ycgco2rgb(imagebuffer, imageout.data, w*h);
  ctx.putImageData(imageout, 0, 0);
}
function loadUserImage(event) {
  var file = event.target.files[0];
  var reader  = new FileReader();
  reader.addEventListener("load", function () {
    document.getElementById('srcimage').src = reader.result;
  }, false);
  if (file) reader.readAsDataURL(file);
}
function changeStrength(strength) {
  config.strength=dering_map[strength.value];
  document.getElementById('strengthVal').innerText = config.strength;
  update_image();
}
function changeLapping(lapping) {
  config.lapping=!!(lapping.checked);
  update_image();
}
function changeScale(scale) {
  config.scale=cq_map[scale.value];
  document.getElementById('scaleVal').innerText = config.scale / 16.;
  update_image();
}
