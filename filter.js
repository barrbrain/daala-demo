var filter = (function(global, foreign, buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;

function _unlaphorz(i11, i15, i12, i14) {
 i11 = i11 | 0;
 i15 = i15 | 0;
 i12 = i12 | 0;
 i14 = i14 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i13 = 0, i16 = 0;
 i5 = (i12 | 0) > 10;
 i6 = (i15 | 0) > 0;
 i7 = i14 + 4 | 0;
 i8 = i14 + 8 | 0;
 i9 = i14 + 12 | 0;
 i10 = i15 << 2;
 i13 = 0;
 do {
  L3 : do if (i5) {
   i2 = (Math_imul(i13, i12) | 0) + -1 | 0;
   if (i6) i3 = 6; else {
    i1 = 6;
    while (1) if ((i1 + 12 | 0) < (i12 | 0)) i1 = i1 + 8 | 0; else break L3;
   }
   while (1) {
    i1 = (Math_imul(i2 + i3 | 0, i15) | 0) + i15 | 0;
    i4 = 0;
    do {
     i16 = i1 + i4 | 0;
     HEAP32[i14 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i7 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i8 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i9 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     _od_post_filter4(i14, i14);
     i16 = i16 - i10 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i14 >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i7 >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i8 >> 2];
     HEAP32[i11 + (i16 + i15 << 2) >> 2] = HEAP32[i9 >> 2];
     i4 = i4 + 1 | 0;
    } while ((i4 | 0) != (i15 | 0));
    if ((i3 + 12 | 0) < (i12 | 0)) i3 = i3 + 8 | 0; else break;
   }
  } while (0);
  i13 = i13 + 1 | 0;
 } while ((i13 | 0) != 3);
 return;
}

function _laphorz(i11, i15, i12, i14) {
 i11 = i11 | 0;
 i15 = i15 | 0;
 i12 = i12 | 0;
 i14 = i14 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i13 = 0, i16 = 0;
 i5 = (i12 | 0) > 10;
 i6 = (i15 | 0) > 0;
 i7 = i14 + 4 | 0;
 i8 = i14 + 8 | 0;
 i9 = i14 + 12 | 0;
 i10 = i15 << 2;
 i13 = 0;
 do {
  L3 : do if (i5) {
   i2 = (Math_imul(i13, i12) | 0) + -1 | 0;
   if (i6) i3 = 6; else {
    i1 = 6;
    while (1) if ((i1 + 12 | 0) < (i12 | 0)) i1 = i1 + 8 | 0; else break L3;
   }
   while (1) {
    i1 = (Math_imul(i2 + i3 | 0, i15) | 0) + i15 | 0;
    i4 = 0;
    do {
     i16 = i1 + i4 | 0;
     HEAP32[i14 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i7 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i8 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i9 >> 2] = HEAP32[i11 + (i16 << 2) >> 2];
     _od_pre_filter4(i14, i14);
     i16 = i16 - i10 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i14 >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i7 >> 2];
     i16 = i16 + i15 | 0;
     HEAP32[i11 + (i16 << 2) >> 2] = HEAP32[i8 >> 2];
     HEAP32[i11 + (i16 + i15 << 2) >> 2] = HEAP32[i9 >> 2];
     i4 = i4 + 1 | 0;
    } while ((i4 | 0) != (i15 | 0));
    if ((i3 + 12 | 0) < (i12 | 0)) i3 = i3 + 8 | 0; else break;
   }
  } while (0);
  i13 = i13 + 1 | 0;
 } while ((i13 | 0) != 3);
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
