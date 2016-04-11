var filter = (function(global, foreign, buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;

function _unlaphorz(i9, i11, i1, i10) {
 i9 = i9 | 0;
 i11 = i11 | 0;
 i1 = i1 | 0;
 i10 = i10 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i12 = 0;
 i8 = i1 * 3 | 0;
 if ((i8 | 0) <= 10) return;
 i2 = i10 + 4 | 0;
 i3 = i10 + 8 | 0;
 i4 = i10 + 12 | 0;
 i5 = i11 << 2;
 if ((i11 | 0) > 0) i6 = 6; else {
  i1 = 6;
  while (1) if ((i1 + 12 | 0) < (i8 | 0)) i1 = i1 + 8 | 0; else break;
  return;
 }
 while (1) {
  i1 = Math_imul(i6, i11) | 0;
  i7 = 0;
  do {
   i12 = i1 + i7 | 0;
   HEAP32[i10 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i2 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i3 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i4 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   _od_post_filter4(i10, i10);
   i12 = i12 - i5 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i10 >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i2 >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i3 >> 2];
   HEAP32[i9 + (i12 + i11 << 2) >> 2] = HEAP32[i4 >> 2];
   i7 = i7 + 1 | 0;
  } while ((i7 | 0) != (i11 | 0));
  if ((i6 + 12 | 0) < (i8 | 0)) i6 = i6 + 8 | 0; else break;
 }
 return;
}

function _laphorz(i9, i11, i1, i10) {
 i9 = i9 | 0;
 i11 = i11 | 0;
 i1 = i1 | 0;
 i10 = i10 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i12 = 0;
 i8 = i1 * 3 | 0;
 if ((i8 | 0) <= 10) return;
 i2 = i10 + 4 | 0;
 i3 = i10 + 8 | 0;
 i4 = i10 + 12 | 0;
 i5 = i11 << 2;
 if ((i11 | 0) > 0) i6 = 6; else {
  i1 = 6;
  while (1) if ((i1 + 12 | 0) < (i8 | 0)) i1 = i1 + 8 | 0; else break;
  return;
 }
 while (1) {
  i1 = Math_imul(i6, i11) | 0;
  i7 = 0;
  do {
   i12 = i1 + i7 | 0;
   HEAP32[i10 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i2 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i3 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i4 >> 2] = HEAP32[i9 + (i12 << 2) >> 2];
   _od_pre_filter4(i10, i10);
   i12 = i12 - i5 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i10 >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i2 >> 2];
   i12 = i12 + i11 | 0;
   HEAP32[i9 + (i12 << 2) >> 2] = HEAP32[i3 >> 2];
   HEAP32[i9 + (i12 + i11 << 2) >> 2] = HEAP32[i4 >> 2];
   i7 = i7 + 1 | 0;
  } while ((i7 | 0) != (i11 | 0));
  if ((i6 + 12 | 0) < (i8 | 0)) i6 = i6 + 8 | 0; else break;
 }
 return;
}

function _od_pre_filter4(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = HEAP32[i1 >> 2] | 0;
 i3 = i7 - (HEAP32[i1 + 12 >> 2] | 0) | 0;
 i6 = HEAP32[i1 + 4 >> 2] | 0;
 i5 = i6 - (HEAP32[i1 + 8 >> 2] | 0) | 0;
 i4 = i5 * 85 >> 6;
 i4 = ((0 - i4 | 0) >>> 31) + i4 | 0;
 i1 = i3 * 75 >> 6;
 i1 = ((0 - i1 | 0) >>> 31) + i1 + ((Math_imul(i4, -15) | 0) + 32 >> 6) | 0;
 i4 = ((i1 * 33 | 0) + 32 >> 6) + i4 | 0;
 i3 = (i1 >> 1) + (i7 - (i3 >> 1)) | 0;
 HEAP32[i2 >> 2] = i3;
 i5 = (i4 >> 1) + (i6 - (i5 >> 1)) | 0;
 HEAP32[i2 + 4 >> 2] = i5;
 HEAP32[i2 + 8 >> 2] = i5 - i4;
 HEAP32[i2 + 12 >> 2] = i3 - i1;
 return;
}

function _od_post_filter4(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = HEAP32[i2 >> 2] | 0;
 i3 = i7 - (HEAP32[i2 + 12 >> 2] | 0) | 0;
 i6 = HEAP32[i2 + 4 >> 2] | 0;
 i5 = i6 - (HEAP32[i2 + 8 >> 2] | 0) | 0;
 i4 = i5 - ((i3 * 33 | 0) + 32 >> 6) | 0;
 i2 = (i3 - ((Math_imul(i4, -15) | 0) + 32 >> 6) << 6 | 0) / 75 | 0;
 i4 = (i4 << 6 | 0) / 85 | 0;
 i3 = (i2 >> 1) + (i7 - (i3 >> 1)) | 0;
 HEAP32[i1 >> 2] = i3;
 i5 = i6 - (i5 >> 1) + (i4 >> 1) | 0;
 HEAP32[i1 + 4 >> 2] = i5;
 HEAP32[i1 + 8 >> 2] = i5 - i4;
 HEAP32[i1 + 12 >> 2] = i3 - i2;
 return;
}

function _lapvert(i1, i5, i2) {
 i1 = i1 | 0;
 i5 = i5 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i6 = 0;
 i4 = i2 * 3 | 0;
 if ((i2 | 0) > 0 & (i5 | 0) > 10) i2 = 0; else return;
 while (1) {
  i3 = 6;
  while (1) {
   i6 = i1 + (i3 << 2) | 0;
   _od_pre_filter4(i6, i6);
   if ((i3 + 12 | 0) < (i5 | 0)) i3 = i3 + 8 | 0; else break;
  }
  i2 = i2 + 1 | 0;
  if ((i2 | 0) >= (i4 | 0)) break; else i1 = i1 + (i5 << 2) | 0;
 }
 return;
}

function _unlapvert(i1, i5, i2) {
 i1 = i1 | 0;
 i5 = i5 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i6 = 0;
 i4 = i2 * 3 | 0;
 if ((i2 | 0) > 0 & (i5 | 0) > 10) i2 = 0; else return;
 while (1) {
  i3 = 6;
  while (1) {
   i6 = i1 + (i3 << 2) | 0;
   _od_post_filter4(i6, i6);
   if ((i3 + 12 | 0) < (i5 | 0)) i3 = i3 + 8 | 0; else break;
  }
  i2 = i2 + 1 | 0;
  if ((i2 | 0) >= (i4 | 0)) break; else i1 = i1 + (i5 << 2) | 0;
 }
 return;
}

return {
od_pre_filter4: _od_pre_filter4,
od_post_filter4: _od_post_filter4,
lapvert:_lapvert,
unlapvert:_unlapvert,
laphorz:_laphorz,
unlaphorz:_unlaphorz};
})(window, null, window.HEAP);
