var dct =  (function(global,env,buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);

function _od_bin_idct8(i1, i2, i3) {
  i1 = i1 | 0;
  i2 = i2 | 0;
  i3 = i3 | 0;
  var i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
  i4 = HEAP32[i3 + 4 >> 2] | 0;
  i7 = HEAP32[i3 + 8 >> 2] | 0;
  i6 = HEAP32[i3 + 12 >> 2] | 0;
  i10 = HEAP32[i3 + 16 >> 2] | 0;
  i8 = (HEAP32[i3 + 20 >> 2] | 0) - ((i6 * 2485 | 0) + 4096 >> 13) | 0;
  i6 = ((i8 * 18205 | 0) + 16384 >> 15) + i6 | 0;
  i14 = (HEAP32[i3 + 28 >> 2] | 0) - ((i4 * 3227 | 0) + 16384 >> 15) | 0;
  i4 = ((i14 * 6393 | 0) + 16384 >> 15) + i4 | 0;
  i14 = i14 - ((i4 * 3227 | 0) + 16384 >> 15) | 0;
  i4 = i4 + i6 | 0;
  i11 = (i4 >>> 31) + i4 >> 1;
  i8 = i14 + (i8 - ((i6 * 2485 | 0) + 4096 >> 13)) | 0;
  i6 = ((i8 * 7489 | 0) + 4096 >> 13) + (i11 - i6) | 0;
  i13 = i8 - ((i6 * 11585 | 0) + 8192 >> 14) | 0;
  i6 = i6 - ((i13 * 19195 | 0) + 16384 >> 15) | 0;
  i9 = (HEAP32[i3 + 24 >> 2] | 0) + ((i7 * 21895 | 0) + 16384 >> 15) | 0;
  i7 = i7 - ((i9 * 15137 | 0) + 8192 >> 14) | 0;
  i12 = ((i10 * 13573 | 0) + 16384 >> 15) + (HEAP32[i3 >> 2] | 0) | 0;
  i10 = i10 - ((i12 * 11585 | 0) + 8192 >> 14) | 0;
  i12 = ((i10 * 13573 | 0) + 16384 >> 15) + i12 | 0;
  i10 = i7 - i10 | 0;
  i5 = (i10 >>> 31) + i10 >> 1;
  i9 = i12 - (((i7 * 21895 | 0) + 16384 >> 15) + i9) | 0;
  i3 = (i9 >>> 31) + i9 >> 1;
  i8 = i14 - ((i8 >>> 31) + i8 >> 1) + i3 | 0;
  i7 = ((i6 >>> 31) + i6 >> 1) + (i5 - i7) | 0;
  i5 = i13 + i5 | 0;
  i3 = i12 - i3 + i11 | 0;
  HEAP32[i1 >> 2] = i3;
  HEAP32[i1 + (i2 << 2) >> 2] = i10 - i5;
  HEAP32[i1 + (i2 << 1 << 2) >> 2] = i7;
  HEAP32[i1 + (i2 * 3 << 2) >> 2] = i9 - i8;
  HEAP32[i1 + (i2 << 2 << 2) >> 2] = i8;
  HEAP32[i1 + (i2 * 5 << 2) >> 2] = i7 - i6;
  HEAP32[i1 + (i2 * 6 << 2) >> 2] = i5;
  HEAP32[i1 + (i2 * 7 << 2) >> 2] = i3 - i4;
  return;
}

function _od_bin_fdct8(i3, i1, i2) {
  i3 = i3 | 0;
  i1 = i1 | 0;
  i2 = i2 | 0;
  var i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
  i14 = HEAP32[i1 >> 2] | 0;
  i4 = HEAP32[i1 + (i2 << 1 << 2) >> 2] | 0;
  i12 = HEAP32[i1 + (i2 << 2 << 2) >> 2] | 0;
  i10 = HEAP32[i1 + (i2 * 6 << 2) >> 2] | 0;
  i11 = i14 - (HEAP32[i1 + (i2 * 7 << 2) >> 2] | 0) | 0;
  i7 = (i11 >>> 31) + i11 >> 1;
  i8 = i10 + (HEAP32[i1 + (i2 << 2) >> 2] | 0) | 0;
  i9 = (i8 >>> 31) + i8 >> 1;
  i10 = i10 - i9 | 0;
  i13 = i4 - (HEAP32[i1 + (i2 * 5 << 2) >> 2] | 0) | 0;
  i5 = i12 + (HEAP32[i1 + (i2 * 3 << 2) >> 2] | 0) | 0;
  i6 = (i5 >>> 31) + i5 >> 1;
  i1 = i14 - i7 + i6 | 0;
  i4 = i9 + (((i13 >>> 31) + i13 >> 1) - i4) | 0;
  i8 = i4 - i8 | 0;
  i9 = i1 - ((i8 * 13573 | 0) + 16384 >> 15) | 0;
  i8 = ((i9 * 11585 | 0) + 8192 >> 14) + i8 | 0;
  i5 = i1 - i5 - ((i4 * 21895 | 0) + 16384 >> 15) | 0;
  i4 = ((i5 * 15137 | 0) + 8192 >> 14) + i4 | 0;
  i1 = ((i10 * 19195 | 0) + 16384 >> 15) + i13 | 0;
  i10 = ((i1 * 11585 | 0) + 8192 >> 14) + i10 | 0;
  i6 = ((i10 >>> 31) + i10 >> 1) + (i12 - i6) | 0;
  i7 = ((i10 * 7489 | 0) + 4096 >> 13) - i1 + i7 | 0;
  i1 = i11 - i7 | 0;
  i2 = ((i1 * 3227 | 0) + 16384 >> 15) + i6 | 0;
  i1 = i1 - ((i2 * 6393 | 0) + 16384 >> 15) | 0;
  i6 = ((i7 * 2485 | 0) + 4096 >> 13) + (i10 - i6) | 0;
  i7 = i7 - ((i6 * 18205 | 0) + 16384 >> 15) | 0;
  HEAP32[i3 >> 2] = i9 - ((i8 * 13573 | 0) + 16384 >> 15);
  HEAP32[i3 + 4 >> 2] = i1;
  HEAP32[i3 + 8 >> 2] = i4;
  HEAP32[i3 + 12 >> 2] = i7;
  HEAP32[i3 + 16 >> 2] = i8;
  HEAP32[i3 + 20 >> 2] = ((i7 * 2485 | 0) + 4096 >> 13) + i6;
  HEAP32[i3 + 24 >> 2] = i5 - ((i4 * 21895 | 0) + 16384 >> 15);
  HEAP32[i3 + 28 >> 2] = ((i1 * 3227 | 0) + 16384 >> 15) + i2;
  return;
}

function _od_bin_idct8x8(i1, i2, i3, i4, i5) {
  i1 = i1 | 0;
  i2 = i2 | 0;
  i3 = i3 | 0;
  i4 = i4 | 0;
  i5 = i5 | 0;
  _od_bin_idct8(i5, 8, i3);
  _od_bin_idct8(i5 + 4 | 0, 8, i3 + (i4 << 2) | 0);
  _od_bin_idct8(i5 + 8 | 0, 8, i3 + (i4 << 1 << 2) | 0);
  _od_bin_idct8(i5 + 12 | 0, 8, i3 + (i4 * 3 << 2) | 0);
  _od_bin_idct8(i5 + 16 | 0, 8, i3 + (i4 << 2 << 2) | 0);
  _od_bin_idct8(i5 + 20 | 0, 8, i3 + (i4 * 5 << 2) | 0);
  _od_bin_idct8(i5 + 24 | 0, 8, i3 + (i4 * 6 << 2) | 0);
  _od_bin_idct8(i5 + 28 | 0, 8, i3 + (i4 * 7 << 2) | 0);
  _od_bin_idct8(i1, i2, i5);
  _od_bin_idct8(i1 + 4 | 0, i2, i5 + 32 | 0);
  _od_bin_idct8(i1 + 8 | 0, i2, i5 + 64 | 0);
  _od_bin_idct8(i1 + 12 | 0, i2, i5 + 96 | 0);
  _od_bin_idct8(i1 + 16 | 0, i2, i5 + 128 | 0);
  _od_bin_idct8(i1 + 20 | 0, i2, i5 + 160 | 0);
  _od_bin_idct8(i1 + 24 | 0, i2, i5 + 192 | 0);
  _od_bin_idct8(i1 + 28 | 0, i2, i5 + 224 | 0);
  return;
}

function _od_bin_fdct8x8(i3, i4, i1, i2, i5) {
  i3 = i3 | 0;
  i4 = i4 | 0;
  i1 = i1 | 0;
  i2 = i2 | 0;
  i5 = i5 | 0;
  _od_bin_fdct8(i5, i1, i2);
  _od_bin_fdct8(i5 + 32 | 0, i1 + 4 | 0, i2);
  _od_bin_fdct8(i5 + 64 | 0, i1 + 8 | 0, i2);
  _od_bin_fdct8(i5 + 96 | 0, i1 + 12 | 0, i2);
  _od_bin_fdct8(i5 + 128 | 0, i1 + 16 | 0, i2);
  _od_bin_fdct8(i5 + 160 | 0, i1 + 20 | 0, i2);
  _od_bin_fdct8(i5 + 192 | 0, i1 + 24 | 0, i2);
  _od_bin_fdct8(i5 + 224 | 0, i1 + 28 | 0, i2);
  _od_bin_fdct8(i3, i5, 8);
  _od_bin_fdct8(i3 + (i4 << 2) | 0, i5 + 4 | 0, 8);
  _od_bin_fdct8(i3 + (i4 << 1 << 2) | 0, i5 + 8 | 0, 8);
  _od_bin_fdct8(i3 + (i4 * 3 << 2) | 0, i5 + 12 | 0, 8);
  _od_bin_fdct8(i3 + (i4 << 2 << 2) | 0, i5 + 16 | 0, 8);
  _od_bin_fdct8(i3 + (i4 * 5 << 2) | 0, i5 + 20 | 0, 8);
  _od_bin_fdct8(i3 + (i4 * 6 << 2) | 0, i5 + 24 | 0, 8);
  _od_bin_fdct8(i3 + (i4 * 7 << 2) | 0, i5 + 28 | 0, 8);
  return;
}

return { od_bin_fdct8: _od_bin_fdct8, od_bin_idct8: _od_bin_idct8, od_bin_idct8x8: _od_bin_idct8x8, od_bin_fdct8x8: _od_bin_fdct8x8};
})(window, null, window.HEAP);
