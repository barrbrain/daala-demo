var dering = (function(global,env,buffer) {
'use asm';
  
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;
var Math_clz32=global.Math.clz32;

function _od_dir_find8(i10, i11, i14) {
 i10 = i10 | 0;
 i11 = i11 | 0;
 i14 = i14 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i12 = 0, i13 = 0, i15 = 0, i16 = 0, i17 = 0;
 i13 = i14 + 240 | 0;
 i1 = 0;
 do {
  HEAP32[i14 + (i1 + 52 << 2) >> 2] = 0;
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != 128);
 i12 = i14 + 208 | 0;
 i8 = 0;
 do {
  i2 = Math_imul(i8, i11) | 0;
  i3 = i8 + 60 | 0;
  i4 = i8 + 75 | 0;
  i5 = i14 + (i8 + 90 << 2) | 0;
  i6 = i8 + 108 | 0;
  i7 = i8 + 127 | 0;
  i1 = (i8 | 0) / 2 | 0;
  i9 = 0;
  do {
   i16 = HEAP32[i10 + (i9 + i2 << 2) >> 2] >> 4;
   i15 = i14 + (i3 + i9 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i15 = (i9 | 0) / 2 | 0;
   i17 = i14 + (i4 + i15 << 2) | 0;
   HEAP32[i17 >> 2] = (HEAP32[i17 >> 2] | 0) + i16;
   HEAP32[i5 >> 2] = (HEAP32[i5 >> 2] | 0) + i16;
   i15 = i14 + (i6 - i15 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i15 = i14 + (i7 - i9 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i15 = i14 + (i9 + 138 - i1 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i15 = i14 + (i9 + 150 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i15 = i14 + (i9 + 165 + i1 << 2) | 0;
   HEAP32[i15 >> 2] = (HEAP32[i15 >> 2] | 0) + i16;
   i9 = i9 + 1 | 0;
  } while ((i9 | 0) != 8);
  i8 = i8 + 1 | 0;
 } while ((i8 | 0) != 8);
 i5 = i14 + 216 | 0;
 i6 = i14 + 232 | 0;
 i8 = HEAP32[i14 + 360 >> 2] | 0;
 i8 = Math_imul(i8, i8) | 0;
 i7 = HEAP32[i14 + 600 >> 2] | 0;
 i7 = Math_imul(i7, i7) | 0;
 i2 = HEAP32[i14 + 364 >> 2] | 0;
 i2 = (HEAP32[i5 >> 2] | 0) + i8 + (Math_imul(i2, i2) | 0) | 0;
 i8 = HEAP32[i14 + 604 >> 2] | 0;
 i8 = (HEAP32[i6 >> 2] | 0) + i7 + (Math_imul(i8, i8) | 0) | 0;
 i7 = HEAP32[i14 + 368 >> 2] | 0;
 i7 = i2 + (Math_imul(i7, i7) | 0) | 0;
 i2 = HEAP32[i14 + 608 >> 2] | 0;
 i2 = i8 + (Math_imul(i2, i2) | 0) | 0;
 i8 = HEAP32[i14 + 372 >> 2] | 0;
 i8 = i7 + (Math_imul(i8, i8) | 0) | 0;
 i7 = HEAP32[i14 + 612 >> 2] | 0;
 i7 = i2 + (Math_imul(i7, i7) | 0) | 0;
 i2 = HEAP32[i14 + 376 >> 2] | 0;
 i2 = i8 + (Math_imul(i2, i2) | 0) | 0;
 i8 = HEAP32[i14 + 616 >> 2] | 0;
 i8 = i7 + (Math_imul(i8, i8) | 0) | 0;
 i7 = HEAP32[i14 + 380 >> 2] | 0;
 i7 = i2 + (Math_imul(i7, i7) | 0) | 0;
 i2 = HEAP32[i14 + 620 >> 2] | 0;
 i2 = i8 + (Math_imul(i2, i2) | 0) | 0;
 i8 = HEAP32[i14 + 384 >> 2] | 0;
 i8 = i7 + (Math_imul(i8, i8) | 0) | 0;
 i7 = HEAP32[i14 + 624 >> 2] | 0;
 i7 = i2 + (Math_imul(i7, i7) | 0) | 0;
 i2 = HEAP32[i14 + 388 >> 2] | 0;
 i2 = i8 + (Math_imul(i2, i2) | 0) | 0;
 i8 = HEAP32[i14 + 628 >> 2] | 0;
 i8 = i7 + (Math_imul(i8, i8) | 0) | 0;
 i7 = i14 + 200 | 0;
 i4 = HEAP32[i7 >> 2] | 0;
 HEAP32[i5 >> 2] = Math_imul(i2, i4) | 0;
 HEAP32[i6 >> 2] = Math_imul(i8, i4) | 0;
 i8 = i14 + 224 | 0;
 i2 = HEAP32[i12 >> 2] | 0;
 i1 = HEAP32[i8 >> 2] | 0;
 i3 = 0;
 do {
  i16 = HEAP32[i14 + (i3 + 60 << 2) >> 2] | 0;
  i16 = Math_imul(i16, i16) | 0;
  i15 = 14 - i3 | 0;
  i17 = HEAP32[i14 + (i15 + 60 << 2) >> 2] | 0;
  i16 = (Math_imul(i17, i17) | 0) + i16 | 0;
  i17 = i14 + (i3 + 43 << 2) | 0;
  i2 = (Math_imul(i16, HEAP32[i17 >> 2] | 0) | 0) + i2 | 0;
  HEAP32[i12 >> 2] = i2;
  i16 = HEAP32[i14 + (i3 + 120 << 2) >> 2] | 0;
  i3 = i3 + 1 | 0;
  i16 = Math_imul(i16, i16) | 0;
  i15 = HEAP32[i14 + (i15 + 120 << 2) >> 2] | 0;
  i16 = (Math_imul(i15, i15) | 0) + i16 | 0;
  i1 = (Math_imul(i16, HEAP32[i17 >> 2] | 0) | 0) + i1 | 0;
  HEAP32[i8 >> 2] = i1;
 } while ((i3 | 0) != 7);
 i3 = HEAP32[i14 + 268 >> 2] | 0;
 HEAP32[i12 >> 2] = i2 + (Math_imul(Math_imul(i3, i3) | 0, i4) | 0);
 i2 = HEAP32[i14 + 508 >> 2] | 0;
 HEAP32[i8 >> 2] = i1 + (Math_imul(Math_imul(i2, i2) | 0, i4) | 0);
 i1 = i14 + 176 | 0;
 i2 = i14 + 184 | 0;
 i3 = i14 + 192 | 0;
 i4 = 1;
 do {
  i17 = i14 + (i4 + 52 << 2) | 0;
  i16 = HEAP32[i13 + (i4 * 60 | 0) + 12 >> 2] | 0;
  i16 = Math_imul(i16, i16) | 0;
  i16 = (HEAP32[i17 >> 2] | 0) + i16 | 0;
  HEAP32[i17 >> 2] = i16;
  i15 = HEAP32[i13 + (i4 * 60 | 0) + 16 >> 2] | 0;
  i15 = i16 + (Math_imul(i15, i15) | 0) | 0;
  i16 = HEAP32[i13 + (i4 * 60 | 0) + 20 >> 2] | 0;
  i16 = i15 + (Math_imul(i16, i16) | 0) | 0;
  HEAP32[i17 >> 2] = i16;
  i15 = HEAP32[i13 + (i4 * 60 | 0) + 24 >> 2] | 0;
  i15 = i16 + (Math_imul(i15, i15) | 0) | 0;
  i16 = HEAP32[i13 + (i4 * 60 | 0) + 28 >> 2] | 0;
  i16 = i15 + (Math_imul(i16, i16) | 0) | 0;
  HEAP32[i17 >> 2] = i16;
  i16 = Math_imul(i16, HEAP32[i7 >> 2] | 0) | 0;
  HEAP32[i17 >> 2] = i16;
  i15 = HEAP32[i13 + (i4 * 60 | 0) >> 2] | 0;
  i15 = Math_imul(i15, i15) | 0;
  i11 = HEAP32[i13 + (i4 * 60 | 0) + 40 >> 2] | 0;
  i15 = (Math_imul(i11, i11) | 0) + i15 | 0;
  i16 = (Math_imul(i15, HEAP32[i1 >> 2] | 0) | 0) + i16 | 0;
  HEAP32[i17 >> 2] = i16;
  i15 = HEAP32[i13 + (i4 * 60 | 0) + 4 >> 2] | 0;
  i15 = Math_imul(i15, i15) | 0;
  i11 = HEAP32[i13 + (i4 * 60 | 0) + 36 >> 2] | 0;
  i15 = (Math_imul(i11, i11) | 0) + i15 | 0;
  i16 = (Math_imul(i15, HEAP32[i2 >> 2] | 0) | 0) + i16 | 0;
  HEAP32[i17 >> 2] = i16;
  i15 = HEAP32[i13 + (i4 * 60 | 0) + 8 >> 2] | 0;
  i15 = Math_imul(i15, i15) | 0;
  i11 = HEAP32[i13 + (i4 * 60 | 0) + 32 >> 2] | 0;
  i15 = (Math_imul(i11, i11) | 0) + i15 | 0;
  HEAP32[i17 >> 2] = (Math_imul(i15, HEAP32[i3 >> 2] | 0) | 0) + i16;
  i4 = i4 + 2 | 0;
 } while ((i4 | 0) < 8);
 i15 = HEAP32[i12 >> 2] | 0;
 i15 = (i15 | 0) > 0 ? i15 : 0;
 i16 = HEAP32[i14 + 212 >> 2] | 0;
 i17 = (i16 | 0) > (i15 | 0);
 i15 = i17 ? i16 : i15;
 i16 = HEAP32[i5 >> 2] | 0;
 i12 = (i16 | 0) > (i15 | 0);
 i15 = i12 ? i16 : i15;
 i16 = HEAP32[i14 + 220 >> 2] | 0;
 i11 = (i16 | 0) > (i15 | 0);
 i15 = i11 ? i16 : i15;
 i16 = HEAP32[i8 >> 2] | 0;
 i10 = (i16 | 0) > (i15 | 0);
 i15 = i10 ? i16 : i15;
 i16 = HEAP32[i14 + 228 >> 2] | 0;
 i9 = (i16 | 0) > (i15 | 0);
 i15 = i9 ? i16 : i15;
 i16 = HEAP32[i6 >> 2] | 0;
 i8 = (i16 | 0) > (i15 | 0);
 i15 = i8 ? i16 : i15;
 i16 = HEAP32[i14 + 236 >> 2] | 0;
 i13 = (i16 | 0) > (i15 | 0);
 i17 = i13 ? 7 : i8 ? 6 : i9 ? 5 : i10 ? 4 : i11 ? 3 : i12 ? 2 : i17 & 1;
 i15 = (i13 ? i16 : i15) - (HEAP32[i14 + ((i17 + 4 & 7) + 52 << 2) >> 2] | 0) >> 16;
 i15 = (i15 | 0) < 32767 ? i15 : 32767;
 i16 = 56 - (Math_clz32(i15 | 0) | 0) | 0;
 return HEAP32[i14 + (((i15 | 0) != 0 ? i16 : 24) << 2) >> 2] << 3 | i17 | 0;
}

function _od_filter_dering_direction_8x8_c(i10, i11, i8, i9, i1, i2) {
 i10 = i10 | 0;
 i11 = i11 | 0;
 i8 = i8 | 0;
 i9 = i9 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0;
 i6 = i2 + (i1 * 12 | 0) | 0;
 i7 = i2 + (i1 * 12 | 0) + 4 | 0;
 i1 = i2 + (i1 * 12 | 0) + 8 | 0;
 i4 = 0;
 do {
  i2 = i4 * 14 | 0;
  i3 = Math_imul(i4, i11) | 0;
  i5 = 0;
  do {
   i19 = i5 + i2 | 0;
   i12 = HEAP32[i8 + (i19 << 2) >> 2] | 0;
   i17 = HEAP32[i6 >> 2] | 0;
   i18 = (HEAP32[i8 + (i17 + i19 << 2) >> 2] | 0) - i12 | 0;
   i17 = (HEAP32[i8 + (i19 - i17 << 2) >> 2] | 0) - i12 | 0;
   i15 = HEAP32[i7 >> 2] | 0;
   i16 = (HEAP32[i8 + (i15 + i19 << 2) >> 2] | 0) - i12 | 0;
   i15 = (HEAP32[i8 + (i19 - i15 << 2) >> 2] | 0) - i12 | 0;
   i13 = HEAP32[i1 >> 2] | 0;
   i14 = (HEAP32[i8 + (i13 + i19 << 2) >> 2] | 0) - i12 | 0;
   i13 = (HEAP32[i8 + (i19 - i13 << 2) >> 2] | 0) - i12 | 0;
   HEAP32[i10 + (i5 + i3 << 2) >> 2] = (((((i18 | 0) > -1 ? i18 : 0 - i18 | 0) | 0) < (i9 | 0) ? i18 * 3 | 0 : 0) + ((((i17 | 0) > -1 ? i17 : 0 - i17 | 0) | 0) < (i9 | 0) ? i17 * 3 | 0 : 0) + ((((i16 | 0) > -1 ? i16 : 0 - i16 | 0) | 0) < (i9 | 0) ? i16 << 1 : 0) + ((((i15 | 0) > -1 ? i15 : 0 - i15 | 0) | 0) < (i9 | 0) ? i15 << 1 : 0) + ((((i14 | 0) > -1 ? i14 : 0 - i14 | 0) | 0) < (i9 | 0) ? i14 : 0) + ((((i13 | 0) > -1 ? i13 : 0 - i13 | 0) | 0) < (i9 | 0) ? i13 : 0) + 8 >> 4) + i12;
   i5 = i5 + 1 | 0;
  } while ((i5 | 0) != 8);
  i4 = i4 + 1 | 0;
 } while ((i4 | 0) != 8);
 return;
}

function _init_tables(i1) {
 i1 = i1 | 0;
 HEAP32[i1 >> 2] = -13;
 HEAP32[i1 + 4 >> 2] = -26;
 HEAP32[i1 + 8 >> 2] = -39;
 HEAP32[i1 + 12 >> 2] = 1;
 HEAP32[i1 + 16 >> 2] = -12;
 HEAP32[i1 + 20 >> 2] = -11;
 HEAP32[i1 + 24 >> 2] = 1;
 HEAP32[i1 + 28 >> 2] = 2;
 HEAP32[i1 + 32 >> 2] = 3;
 HEAP32[i1 + 36 >> 2] = 1;
 HEAP32[i1 + 40 >> 2] = 16;
 HEAP32[i1 + 44 >> 2] = 17;
 HEAP32[i1 + 48 >> 2] = 15;
 HEAP32[i1 + 52 >> 2] = 30;
 HEAP32[i1 + 56 >> 2] = 45;
 HEAP32[i1 + 60 >> 2] = 14;
 HEAP32[i1 + 64 >> 2] = 29;
 HEAP32[i1 + 68 >> 2] = 43;
 HEAP32[i1 + 72 >> 2] = 14;
 HEAP32[i1 + 76 >> 2] = 28;
 HEAP32[i1 + 80 >> 2] = 42;
 HEAP32[i1 + 84 >> 2] = 14;
 HEAP32[i1 + 88 >> 2] = 27;
 HEAP32[i1 + 92 >> 2] = 41;
 HEAP32[i1 + 96 >> 2] = 128;
 HEAP32[i1 + 100 >> 2] = 134;
 HEAP32[i1 + 104 >> 2] = 150;
 HEAP32[i1 + 108 >> 2] = 168;
 HEAP32[i1 + 112 >> 2] = 188;
 HEAP32[i1 + 116 >> 2] = 210;
 HEAP32[i1 + 120 >> 2] = 234;
 HEAP32[i1 + 124 >> 2] = 262;
 HEAP32[i1 + 128 >> 2] = 292;
 HEAP32[i1 + 132 >> 2] = 327;
 HEAP32[i1 + 136 >> 2] = 365;
 HEAP32[i1 + 140 >> 2] = 408;
 HEAP32[i1 + 144 >> 2] = 455;
 HEAP32[i1 + 148 >> 2] = 509;
 HEAP32[i1 + 152 >> 2] = 569;
 HEAP32[i1 + 156 >> 2] = 635;
 HEAP32[i1 + 160 >> 2] = 710;
 HEAP32[i1 + 164 >> 2] = 768;
 HEAP32[i1 + 168 >> 2] = 0;
 HEAP32[i1 + 172 >> 2] = 840;
 HEAP32[i1 + 176 >> 2] = 420;
 HEAP32[i1 + 180 >> 2] = 280;
 HEAP32[i1 + 184 >> 2] = 210;
 HEAP32[i1 + 188 >> 2] = 168;
 HEAP32[i1 + 192 >> 2] = 140;
 HEAP32[i1 + 196 >> 2] = 120;
 HEAP32[i1 + 200 >> 2] = 105;
 return;
}

function _od_filter_dering_orthogonal_8x8_c(i13, i14, i9, i11, i12, i10, i1, i2) {
 i13 = i13 | 0;
 i14 = i14 | 0;
 i9 = i9 | 0;
 i11 = i11 | 0;
 i12 = i12 | 0;
 i10 = i10 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0;
 i1 = (i1 + -1 | 0) >>> 0 < 3 ? 14 : 1;
 i2 = (i10 | 0) / 3 | 0;
 i3 = i1 << 1;
 i7 = 0;
 do {
  i4 = i7 * 14 | 0;
  i5 = Math_imul(i7, i12) | 0;
  i6 = Math_imul(i7, i14) | 0;
  i8 = 0;
  do {
   i16 = i8 + i4 | 0;
   i15 = HEAP32[i9 + (i16 << 2) >> 2] | 0;
   i17 = i15 - (HEAP32[i11 + (i8 + i5 << 2) >> 2] | 0) | 0;
   i17 = ((i17 | 0) > -1 ? i17 : 0 - i17 | 0) + i2 | 0;
   i17 = ((i17 | 0) < (i10 | 0) ? i17 ^ i10 : 0) ^ i10;
   i20 = (HEAP32[i9 + (i16 + i1 << 2) >> 2] | 0) - i15 | 0;
   i19 = (HEAP32[i9 + (i16 - i1 << 2) >> 2] | 0) - i15 | 0;
   i18 = (HEAP32[i9 + (i16 + i3 << 2) >> 2] | 0) - i15 | 0;
   i16 = (HEAP32[i9 + (i16 - i3 << 2) >> 2] | 0) - i15 | 0;
   HEAP32[i13 + (i8 + i6 << 2) >> 2] = (((((((i20 | 0) > -1 ? i20 : 0 - i20 | 0) | 0) < (i17 | 0) ? i20 : 0) + ((((i19 | 0) > -1 ? i19 : 0 - i19 | 0) | 0) < (i17 | 0) ? i19 : 0) + ((((i18 | 0) > -1 ? i18 : 0 - i18 | 0) | 0) < (i17 | 0) ? i18 : 0) + ((((i16 | 0) > -1 ? i16 : 0 - i16 | 0) | 0) < (i17 | 0) ? i16 : 0) | 0) * 3 | 0) + 8 >> 4) + i15;
   i8 = i8 + 1 | 0;
  } while ((i8 | 0) != 8);
  i7 = i7 + 1 | 0;
 } while ((i7 | 0) != 8);
 return;
}

function _od_dering(i9, i10, i7, i8, i2, i4, i6) {
 i9 = i9 | 0;
 i10 = i10 | 0;
 i7 = i7 | 0;
 i8 = i8 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 i6 = i6 | 0;
 var i1 = 0, i3 = 0, i5 = 0, i11 = 0;
 i1 = -3;
 do {
  i3 = Math_imul(i1, i10) | 0;
  i5 = i1 * 14 | 0;
  HEAP32[i6 + (i5 + 222 << 2) >> 2] = HEAP32[i7 + (i3 + -3 << 2) >> 2];
  HEAP32[i6 + (i5 + 223 << 2) >> 2] = HEAP32[i7 + (i3 + -2 << 2) >> 2];
  HEAP32[i6 + (i5 + 224 << 2) >> 2] = HEAP32[i7 + (i3 + -1 << 2) >> 2];
  HEAP32[i6 + (i5 + 225 << 2) >> 2] = HEAP32[i7 + (i3 << 2) >> 2];
  HEAP32[i6 + (i5 + 226 << 2) >> 2] = HEAP32[i7 + (i3 + 1 << 2) >> 2];
  HEAP32[i6 + (i5 + 227 << 2) >> 2] = HEAP32[i7 + (i3 + 2 << 2) >> 2];
  HEAP32[i6 + (i5 + 228 << 2) >> 2] = HEAP32[i7 + (i3 + 3 << 2) >> 2];
  HEAP32[i6 + (i5 + 229 << 2) >> 2] = HEAP32[i7 + (i3 + 4 << 2) >> 2];
  HEAP32[i6 + (i5 + 230 << 2) >> 2] = HEAP32[i7 + (i3 + 5 << 2) >> 2];
  HEAP32[i6 + (i5 + 231 << 2) >> 2] = HEAP32[i7 + (i3 + 6 << 2) >> 2];
  HEAP32[i6 + (i5 + 232 << 2) >> 2] = HEAP32[i7 + (i3 + 7 << 2) >> 2];
  HEAP32[i6 + (i5 + 233 << 2) >> 2] = HEAP32[i7 + (i3 + 8 << 2) >> 2];
  HEAP32[i6 + (i5 + 234 << 2) >> 2] = HEAP32[i7 + (i3 + 9 << 2) >> 2];
  HEAP32[i6 + (i5 + 235 << 2) >> 2] = HEAP32[i7 + (i3 + 10 << 2) >> 2];
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != 11);
 i5 = i6 + 900 | 0;
 if (!i2) {
  i2 = _od_dir_find8(i7, i8, i6) | 0;
  i3 = i2 & 7;
  i2 = (Math_imul(i2 >> 3, i4) | 0) + 128 >> 8;
 } else {
  i3 = 0;
  i2 = i4;
 }
 _od_filter_dering_direction_8x8_c(i9, i10, i5, i2, i3, i6);
 i1 = 0;
 do {
  i11 = Math_imul(i1, i10) | 0;
  i4 = i1 * 14 | 0;
  HEAP32[i6 + (i4 + 225 << 2) >> 2] = HEAP32[i9 + (i11 << 2) >> 2];
  HEAP32[i6 + (i4 + 226 << 2) >> 2] = HEAP32[i9 + (i11 + 1 << 2) >> 2];
  HEAP32[i6 + (i4 + 227 << 2) >> 2] = HEAP32[i9 + (i11 + 2 << 2) >> 2];
  HEAP32[i6 + (i4 + 228 << 2) >> 2] = HEAP32[i9 + (i11 + 3 << 2) >> 2];
  HEAP32[i6 + (i4 + 229 << 2) >> 2] = HEAP32[i9 + (i11 + 4 << 2) >> 2];
  HEAP32[i6 + (i4 + 230 << 2) >> 2] = HEAP32[i9 + (i11 + 5 << 2) >> 2];
  HEAP32[i6 + (i4 + 231 << 2) >> 2] = HEAP32[i9 + (i11 + 6 << 2) >> 2];
  HEAP32[i6 + (i4 + 232 << 2) >> 2] = HEAP32[i9 + (i11 + 7 << 2) >> 2];
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != 8);
 _od_filter_dering_orthogonal_8x8_c(i9, i10, i5, i7, i8, i2, i3, 0);
 return;
}

function _dering_image(i5, i11, i8, i10, i9) {
 i5 = i5 | 0;
 i11 = i11 | 0;
 i8 = i8 | 0;
 i10 = i10 | 0;
 i9 = i9 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i6 = 0, i7 = 0, i12 = 0;
 _init_tables(i9);
 i6 = Math_imul(i8, i11) | 0;
 i7 = (i11 | 0) > 16;
 if ((i8 | 0) < 17 | i7 ^ 1) return; else {
  i4 = 16;
  i1 = 8;
 }
 while (1) {
  i3 = i5 + ((Math_imul(i1, i11) | 0) << 2) | 0;
  i2 = 16;
  i1 = 8;
  while (1) {
   i1 = i3 + (i1 << 2) | 0;
   _od_dering(i1, i11, i1, i11, 0, i10, i9);
   i1 = i2 + 8 | 0;
   if ((i1 | 0) < (i11 | 0)) {
    i12 = i2;
    i2 = i1;
    i1 = i12;
   } else break;
  }
  i1 = i4 + 8 | 0;
  if ((i1 | 0) < (i8 | 0)) {
   i12 = i4;
   i4 = i1;
   i1 = i12;
  } else break;
 }
 i5 = i5 + (i6 << 2) | 0;
 if (i7) {
  i4 = 16;
  i1 = 8;
 } else return;
 while (1) {
  i2 = i5 + ((Math_imul(i1, i11) | 0) << 2) | 0;
  i3 = 16;
  i1 = 8;
  while (1) {
   i1 = i2 + (i1 << 2) | 0;
   _od_dering(i1, i11, i1, i11, 1, i10, i9);
   i1 = i3 + 8 | 0;
   if ((i1 | 0) < (i11 | 0)) {
    i12 = i3;
    i3 = i1;
    i1 = i12;
   } else break;
  }
  i1 = i4 + 8 | 0;
  if ((i1 | 0) < (i8 | 0)) {
   i12 = i4;
   i4 = i1;
   i1 = i12;
  } else break;
 }
 i5 = i5 + (i6 << 2) | 0;
 if (i7) {
  i4 = 16;
  i1 = 8;
 } else return;
 while (1) {
  i2 = i5 + ((Math_imul(i1, i11) | 0) << 2) | 0;
  i3 = 16;
  i1 = 8;
  while (1) {
   i1 = i2 + (i1 << 2) | 0;
   _od_dering(i1, i11, i1, i11, 2, i10, i9);
   i1 = i3 + 8 | 0;
   if ((i1 | 0) < (i11 | 0)) {
    i12 = i3;
    i3 = i1;
    i1 = i12;
   } else break;
  }
  i1 = i4 + 8 | 0;
  if ((i1 | 0) < (i8 | 0)) {
   i12 = i4;
   i4 = i1;
   i1 = i12;
  } else break;
 }
 return;
}

return { od_dir_find8: _od_dir_find8, init_tables: _init_tables, od_filter_dering_direction_8x8_c: _od_filter_dering_direction_8x8_c, od_filter_dering_orthogonal_8x8_c: _od_filter_dering_orthogonal_8x8_c, od_dering: _od_dering, dering_image: _dering_image };
})(self, null, self.HEAP);
