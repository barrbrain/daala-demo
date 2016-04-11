var filter = (function(global, foreign, buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;

function _laphorz(i13, i15, i1, i14) {
 i13 = i13 | 0;
 i15 = i15 | 0;
 i1 = i1 | 0;
 i14 = i14 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i16 = 0;
 i3 = i1 * 3 | 0;
 if ((i3 | 0) <= 12) return;
 i5 = i14 + 4 | 0;
 i6 = i14 + 8 | 0;
 i7 = i14 + 12 | 0;
 i8 = i14 + 16 | 0;
 i10 = i14 + 20 | 0;
 i11 = i14 + 24 | 0;
 i12 = i14 + 28 | 0;
 i4 = i15 << 3;
 if ((i15 | 0) > 0) {
  i9 = 12;
  i1 = 4;
 } else return;
 while (1) {
  i1 = Math_imul(i1, i15) | 0;
  i2 = 0;
  do {
   i16 = i1 + i2 | 0;
   HEAP32[i14 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i5 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i6 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i7 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i8 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i10 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i11 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i12 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   _od_pre_filter8(i14, i14);
   i16 = i16 - i4 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i14 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i5 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i6 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i7 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i8 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i10 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i11 >> 2];
   HEAP32[i13 + (i16 + i15 << 2) >> 2] = HEAP32[i12 >> 2];
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != (i15 | 0));
  i1 = i9 + 8 | 0;
  if ((i1 | 0) < (i3 | 0)) {
   i16 = i9;
   i9 = i1;
   i1 = i16;
  } else break;
 }
 return;
}

function _unlaphorz(i13, i15, i1, i14) {
 i13 = i13 | 0;
 i15 = i15 | 0;
 i1 = i1 | 0;
 i14 = i14 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i16 = 0;
 i3 = i1 * 3 | 0;
 if ((i3 | 0) <= 12) return;
 i5 = i14 + 4 | 0;
 i6 = i14 + 8 | 0;
 i7 = i14 + 12 | 0;
 i8 = i14 + 16 | 0;
 i10 = i14 + 20 | 0;
 i11 = i14 + 24 | 0;
 i12 = i14 + 28 | 0;
 i4 = i15 << 3;
 if ((i15 | 0) > 0) {
  i9 = 12;
  i1 = 4;
 } else return;
 while (1) {
  i1 = Math_imul(i1, i15) | 0;
  i2 = 0;
  do {
   i16 = i1 + i2 | 0;
   HEAP32[i14 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i5 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i6 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i7 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i8 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i10 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i11 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i12 >> 2] = HEAP32[i13 + (i16 << 2) >> 2];
   _od_post_filter8(i14, i14);
   i16 = i16 - i4 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i14 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i5 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i6 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i7 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i8 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i10 >> 2];
   i16 = i16 + i15 | 0;
   HEAP32[i13 + (i16 << 2) >> 2] = HEAP32[i11 >> 2];
   HEAP32[i13 + (i16 + i15 << 2) >> 2] = HEAP32[i12 >> 2];
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != (i15 | 0));
  i1 = i9 + 8 | 0;
  if ((i1 | 0) < (i3 | 0)) {
   i16 = i9;
   i9 = i1;
   i1 = i16;
  } else break;
 }
 return;
}

function _od_pre_filter8(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0;
 i13 = HEAP32[i1 >> 2] | 0;
 i3 = i13 - (HEAP32[i1 + 28 >> 2] | 0) | 0;
 i12 = HEAP32[i1 + 4 >> 2] | 0;
 i5 = i12 - (HEAP32[i1 + 24 >> 2] | 0) | 0;
 i11 = HEAP32[i1 + 8 >> 2] | 0;
 i7 = i11 - (HEAP32[i1 + 20 >> 2] | 0) | 0;
 i10 = HEAP32[i1 + 12 >> 2] | 0;
 i9 = i10 - (HEAP32[i1 + 16 >> 2] | 0) | 0;
 i8 = i9 * 93 >> 6;
 i8 = ((0 - i8 | 0) >>> 31) + i8 | 0;
 i6 = i7 * 72 >> 6;
 i6 = ((0 - i6 | 0) >>> 31) + i6 | 0;
 i4 = i5 * 73 >> 6;
 i4 = ((0 - i4 | 0) >>> 31) + i4 | 0;
 i1 = i3 * 78 >> 6;
 i1 = ((0 - i1 | 0) >>> 31) + i1 + ((Math_imul(i4, -10) | 0) + 32 >> 6) | 0;
 i4 = ((Math_imul(i6, -23) | 0) + 32 >> 6) + i4 + ((i1 * 23 | 0) + 32 >> 6) | 0;
 i6 = ((Math_imul(i8, -28) | 0) + 32 >> 6) + i6 + ((i4 * 37 | 0) + 32 >> 6) | 0;
 i8 = ((i6 * 50 | 0) + 32 >> 6) + i8 | 0;
 i3 = (i1 >> 1) + (i13 - (i3 >> 1)) | 0;
 HEAP32[i2 >> 2] = i3;
 i5 = (i4 >> 1) + (i12 - (i5 >> 1)) | 0;
 HEAP32[i2 + 4 >> 2] = i5;
 i7 = (i6 >> 1) + (i11 - (i7 >> 1)) | 0;
 HEAP32[i2 + 8 >> 2] = i7;
 i9 = (i8 >> 1) + (i10 - (i9 >> 1)) | 0;
 HEAP32[i2 + 12 >> 2] = i9;
 HEAP32[i2 + 16 >> 2] = i9 - i8;
 HEAP32[i2 + 20 >> 2] = i7 - i6;
 HEAP32[i2 + 24 >> 2] = i5 - i4;
 HEAP32[i2 + 28 >> 2] = i3 - i1;
 return;
}

function _od_post_filter8(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0;
 i13 = HEAP32[i2 >> 2] | 0;
 i3 = i13 - (HEAP32[i2 + 28 >> 2] | 0) | 0;
 i12 = HEAP32[i2 + 4 >> 2] | 0;
 i5 = i12 - (HEAP32[i2 + 24 >> 2] | 0) | 0;
 i11 = HEAP32[i2 + 8 >> 2] | 0;
 i7 = i11 - (HEAP32[i2 + 20 >> 2] | 0) | 0;
 i10 = HEAP32[i2 + 12 >> 2] | 0;
 i9 = i10 - (HEAP32[i2 + 16 >> 2] | 0) | 0;
 i8 = i9 - ((i7 * 50 | 0) + 32 >> 6) | 0;
 i6 = i7 - ((Math_imul(i8, -28) | 0) + 32 >> 6) - ((i5 * 37 | 0) + 32 >> 6) | 0;
 i4 = i5 - ((Math_imul(i6, -23) | 0) + 32 >> 6) - ((i3 * 23 | 0) + 32 >> 6) | 0;
 i2 = (i3 - (((Math_imul(i4, -10) | 0) + 32 | 0) >>> 6) << 6 | 0) / 78 | 0;
 i4 = (i4 << 6 | 0) / 73 | 0;
 i6 = (i6 << 6 | 0) / 72 | 0;
 i8 = (i8 << 6 | 0) / 93 | 0;
 i3 = (i2 >> 1) + (i13 - (i3 >> 1)) | 0;
 HEAP32[i1 >> 2] = i3;
 i5 = (i4 >> 1) + (i12 - (i5 >> 1)) | 0;
 HEAP32[i1 + 4 >> 2] = i5;
 i7 = (i6 >> 1) + (i11 - (i7 >> 1)) | 0;
 HEAP32[i1 + 8 >> 2] = i7;
 i9 = (i8 >> 1) + (i10 - (i9 >> 1)) | 0;
 HEAP32[i1 + 12 >> 2] = i9;
 HEAP32[i1 + 16 >> 2] = i9 - i8;
 HEAP32[i1 + 20 >> 2] = i7 - i6;
 HEAP32[i1 + 24 >> 2] = i5 - i4;
 HEAP32[i1 + 28 >> 2] = i3 - i2;
 return;
}

function _unlapvert(i3, i1) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0;
 i2 = i1 * 3 | 0;
 if ((i1 | 0) > 0) i1 = 0; else return;
 do {
  i4 = i3 + (i1 << 2) | 0;
  _od_post_filter8(i4, i4);
  i1 = i1 + 8 | 0;
 } while ((i1 | 0) < (i2 | 0));
 return;
}

function _lapvert(i3, i1) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0;
 i2 = i1 * 3 | 0;
 if ((i1 | 0) > 0) i1 = 0; else return;
 do {
  i4 = i3 + (i1 << 2) | 0;
  _od_pre_filter8(i4, i4);
  i1 = i1 + 8 | 0;
 } while ((i1 | 0) < (i2 | 0));
 return;
}

return {
od_pre_filter8: _od_pre_filter8,
od_post_filter8: _od_post_filter8,
lapvert:_lapvert,
unlapvert:_unlapvert,
laphorz:_laphorz,
unlaphorz:_unlaphorz};
})(window, null, window.HEAP);
