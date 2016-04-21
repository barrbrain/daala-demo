var pvq_encoder = (function(global,env,buffer) {
'use asm';

var HEAP16 = new global.Int16Array(buffer);
var HEAP32 = new global.Int32Array(buffer);
var HEAPF64 = new global.Float64Array(buffer);

var Math_floor=global.Math.floor;
var Math_abs=global.Math.abs;
var Math_sqrt=global.Math.sqrt;
var Math_pow=global.Math.pow;
var Math_cos=global.Math.cos;
var Math_sin=global.Math.sin;
var Math_acos=global.Math.acos;
var Math_log=global.Math.log;
var Math_ceil=global.Math.ceil;
var Math_imul=global.Math.imul;

function _od_pvq_theta(i1, i5, i52, i51, i46, i49, i41, i34, i54, d45, i53, i29, i40, i35, i4, i47, i48) {
 i1 = i1 | 0;
 i5 = i5 | 0;
 i52 = i52 | 0;
 i51 = i51 | 0;
 i46 = i46 | 0;
 i49 = i49 | 0;
 i41 = i41 | 0;
 i34 = i34 | 0;
 i54 = i54 | 0;
 d45 = +d45;
 i53 = i53 | 0;
 i29 = i29 | 0;
 i40 = i40 | 0;
 i35 = i35 | 0;
 i4 = i4 | 0;
 i47 = i47 | 0;
 i48 = i48 | 0;
 var i2 = 0, d3 = 0.0, i6 = 0, d7 = 0.0, d8 = 0.0, d9 = 0.0, i10 = 0, d11 = 0.0, d12 = 0.0, i13 = 0, d14 = 0.0, i15 = 0, i16 = 0, d17 = 0.0, d18 = 0.0, d19 = 0.0, i20 = 0, i21 = 0, d22 = 0.0, i23 = 0, i24 = 0, i25 = 0, i26 = 0, d27 = 0.0, d28 = 0.0, d30 = 0.0, d31 = 0.0, i32 = 0, i33 = 0, i36 = 0, d37 = 0.0, i38 = 0, i39 = 0, i42 = 0, i43 = 0, i44 = 0, i50 = 0;
 i42 = i48 + 2720 | 0;
 i6 = i48 + 2728 | 0;
 i32 = i48 + 2736 | 0;
 i43 = i48 + 2992 | 0;
 i33 = i48 + 672 | 0;
 i44 = i48 + 1184 | 0;
 i50 = (i51 | 0) > 0;
 if (i50) {
  d3 = 0.0;
  i2 = 0;
  do {
   d37 = +(HEAP16[i4 + (i2 << 1) >> 1] | 0);
   d31 = +(HEAP32[i5 + (i2 << 2) >> 2] | 0) * d37 * .000030517578125;
   HEAPF64[i48 + 672 + (i2 << 3) >> 3] = d31;
   d37 = +(HEAP32[i52 + (i2 << 2) >> 2] | 0) * d37 * .000030517578125;
   HEAPF64[i48 + 1184 + (i2 << 3) >> 3] = d37;
   d3 = d3 + d31 * d37;
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != (i51 | 0));
 } else d3 = 0.0;
 i38 = (i40 | 0) != 0;
 i36 = i38 & (i35 | 0) != 0;
 d30 = +_od_pvq_compute_gain(i33, i51, i46, i42, d45, 0);
 d12 = +_od_pvq_compute_gain(i44, i51, i46, i6, d45, 0);
 d12 = i36 ? 1.0 : d12;
 i39 = ~~+Math_floor(+(d12 + .5));
 d37 = d12 - +(i39 | 0);
 d11 = d30 * (d30 * 1.4);
 d7 = d11 + +_od_pvq_rate(0, 0, -1, 0, 0, 0, i51, i40, i35) * .147;
 HEAP32[i41 >> 2] = -1;
 HEAP32[i34 >> 2] = 0;
 i2 = i49 + (i51 << 2) | 0;
 if (i50) {
  i4 = i49;
  do {
   HEAP32[i4 >> 2] = 0;
   i4 = i4 + 4 | 0;
  } while (i4 >>> 0 < i2 >>> 0);
 }
 HEAP32[i43 >> 2] = 1;
 d14 = +HEAPF64[i6 >> 3];
 d28 = d3 / (+HEAPF64[i42 >> 3] * d14 + 1.0e-100);
 d28 = d28 < 1.0 ? d28 : 1.0;
 d28 = d28 > -1.0 ? d28 : -1.0;
 if (i38) {
  d3 = d11;
  i5 = 1;
  d31 = d11;
 } else {
  d8 = d30 - d12;
  d9 = 2.0 - d28 * 2.0;
  d3 = d37 < 0.0 ? 0.0 : d37;
  if (!i39) {
   d31 = d30 - d3;
   d3 = d31 * (d31 * 1.4) + d30 * d3 * d9;
  } else d3 = d11;
  d7 = d3 + +_od_pvq_rate(0, i39, 0, 0, 0, 0, i51, 0, i35) * .147;
  HEAP32[i41 >> 2] = 0;
  HEAP32[i34 >> 2] = 0;
  i5 = 0;
  d31 = d8 * (d8 * 1.4) + d30 * d12 * d9;
 }
 L15 : do if ((i51 | 0) < 129) {
  if (d28 > 0.0 & (_od_vector_is_null(i52, i51) | 0) == 0) {
   i26 = i48 + 1696 | 0;
   i4 = ~~(d30 - d37);
   d27 = +Math_acos(+d28);
   i10 = _od_compute_householder(i44, i51, d14, i43, 0) | 0;
   _od_apply_householder(i26, i33, i44, i51);
   i25 = i51 + -1 | 0;
   if ((i10 | 0) < (i25 | 0)) {
    i2 = i10;
    do {
     i24 = i2;
     i2 = i2 + 1 | 0;
     HEAPF64[i48 + 1696 + (i24 << 3) >> 3] = +HEAPF64[i48 + 1696 + (i2 << 3) >> 3];
    } while ((i2 | 0) != (i25 | 0));
   }
   i6 = i4 + -1 | 0;
   i6 = (i6 | 0) > 1 ? i6 : 1;
   i21 = i4 + 1 | 0;
   if ((i6 | 0) > (i21 | 0)) {
    i2 = 0;
    d11 = 0.0;
    i6 = 0;
   } else {
    d22 = d27 * 2.0 / 3.141592653589793;
    i23 = (i40 | i29 | 0) != 0 & 1;
    i24 = (i51 | 0) > 1;
    i2 = 0;
    d8 = 0.0;
    i20 = i6;
    i6 = 0;
    while (1) {
     d19 = d37 + +(i20 | 0);
     i16 = _od_pvq_compute_max_theta(d19, d45) | 0;
     d18 = d22 * +(i16 | 0);
     i4 = ~~+Math_floor(+(d18 + .5));
     i4 = (i4 | 0) > 2 ? i4 + -2 | 0 : 0;
     i15 = i16 + -1 | 0;
     i13 = ~~+Math_ceil(+d18);
     i15 = ((i13 | 0) < (i15 | 0) ? i13 ^ i15 : 0) ^ i15;
     if ((i4 | 0) <= (i15 | 0)) {
      d14 = +Math_sin(+d27);
      d17 = d30 * d19;
      d18 = d19 - d30;
      d18 = d18 * (d18 * 1.4);
      d12 = d7;
      d11 = d3;
      while (1) {
       d9 = +_od_pvq_compute_theta(i4, i16);
       i13 = _od_pvq_compute_k(d19, i4, d9, 0, i51, d45, i23) | 0;
       d3 = d14 * +Math_sin(+d9);
       d3 = d18 + d17 * (2.0 - +Math_cos(+(d27 - d9)) * 2.0 + d3 * (2.0 - +_od_pvq_search_rdo_double(i26, i25, i13, i32, d17 * d3, i48) * 2.0));
       d7 = +_od_pvq_rate(i20, i39, i4, i16, 0, i13, i51, i40, i35) * .147 + d3;
       if (d7 < d12) {
        HEAP32[i41 >> 2] = i4;
        HEAP32[i34 >> 2] = i16;
        if (i24) {
         i2 = 0;
         do {
          HEAP32[i49 + (i2 << 2) >> 2] = HEAP32[i48 + 2736 + (i2 << 2) >> 2];
          i2 = i2 + 1 | 0;
         } while ((i2 | 0) != (i25 | 0));
         i2 = i13;
         d8 = d9;
         i5 = 0;
         i6 = i20;
        } else {
         i2 = i13;
         d8 = d9;
         i5 = 0;
         i6 = i20;
        }
       } else {
        d7 = d12;
        d3 = d11;
       }
       if ((i4 | 0) < (i15 | 0)) {
        d12 = d7;
        d11 = d3;
        i4 = i4 + 1 | 0;
       } else break;
      }
     }
     if ((i20 | 0) < (i21 | 0)) i20 = i20 + 1 | 0; else {
      d11 = d8;
      break;
     }
    }
   }
  } else {
   i2 = 0;
   d11 = 0.0;
   i10 = 0;
   i6 = 0;
  }
  if (d30 < 2.0 | (i38 & (i35 | 0) == 0 | d28 < .5)) {
   i16 = ~~d30;
   i4 = (i16 | 0) > 1 ? i16 : 1;
   i16 = i16 + 1 | 0;
   if ((i4 | 0) > (i16 | 0)) {
    i13 = i2;
    d7 = d11;
   } else {
    i15 = (i40 | i29 | 0) != 0 & 1;
    if (i50) {
     d9 = d3;
     i13 = i4;
    } else {
     i13 = i2;
     while (1) {
      d8 = +(i4 | 0);
      i2 = _od_pvq_compute_k(d8, -1, -1.0, 1, i51, d45, i15) | 0;
      d9 = d30 * d8;
      d8 = d8 - d30;
      d9 = d8 * (d8 * 1.4) + d9 * (2.0 - +_od_pvq_search_rdo_double(i33, i51, i2, i32, d9, i48) * 2.0);
      d8 = +_od_pvq_rate(i4, 0, -1, 0, 0, i2, i51, i40, i35) * .147 + d9;
      if (!(d8 <= d7)) i2 = i13; else {
       HEAP32[i41 >> 2] = -1;
       HEAP32[i34 >> 2] = 0;
       d7 = d8;
       d3 = d9;
       i5 = 1;
       i6 = i4;
      }
      if ((i4 | 0) < (i16 | 0)) {
       i13 = i2;
       i4 = i4 + 1 | 0;
      } else {
       i13 = i2;
       d7 = d11;
       break L15;
      }
     }
    }
    while (1) {
     d8 = +(i13 | 0);
     i4 = _od_pvq_compute_k(d8, -1, -1.0, 1, i51, d45, i15) | 0;
     d3 = d30 * d8;
     d8 = d8 - d30;
     d3 = d8 * (d8 * 1.4) + d3 * (2.0 - +_od_pvq_search_rdo_double(i33, i51, i4, i32, d3, i48) * 2.0);
     d8 = +_od_pvq_rate(i13, 0, -1, 0, 0, i4, i51, i40, i35) * .147 + d3;
     if (!(d8 <= d7)) d3 = d9; else {
      HEAP32[i41 >> 2] = -1;
      HEAP32[i34 >> 2] = 0;
      i2 = 0;
      do {
       HEAP32[i49 + (i2 << 2) >> 2] = HEAP32[i48 + 2736 + (i2 << 2) >> 2];
       i2 = i2 + 1 | 0;
      } while ((i2 | 0) != (i51 | 0));
      d7 = d8;
      i2 = i4;
      i5 = 1;
      i6 = i13;
     }
     if ((i13 | 0) < (i16 | 0)) {
      d9 = d3;
      i13 = i13 + 1 | 0;
     } else {
      i13 = i2;
      d7 = d11;
      break;
     }
    }
   }
  } else {
   i13 = i2;
   d7 = d11;
  }
 } else {
  i13 = 0;
  d7 = 0.0;
  i10 = 0;
  i6 = 0;
 } while (0);
 i4 = (i5 | 0) != 0;
 if (i4) i2 = (i6 | 0) == 0 & 1; else {
  i2 = (i6 | i40 | 0) == 0 ? ((i39 | 0) != 0 ? 1 : 2) : 0;
  if ((i6 | 0) == (i39 | 0)) i2 = i36 | (HEAP32[i41 >> 2] | 0) != 0 ? i2 : 2;
 }
 switch (i2 | 0) {
 case 0:
  {
   d45 = +_od_gain_expand((i4 ? 0.0 : d37) + +(i6 | 0), i46, d45);
   HEAPF64[i42 >> 3] = d45;
   _od_pvq_synthesis_partial(i1, i49, i44, i51, i5, d45, d7, i10, HEAP32[i43 >> 2] | 0, i47, i48 + 2208 | 0);
   break;
  }
 case 2:
  {
   if (i50) {
    i2 = 0;
    do {
     HEAP32[i1 + (i2 << 2) >> 2] = HEAP32[i52 + (i2 << 2) >> 2];
     i2 = i2 + 1 | 0;
    } while ((i2 | 0) != (i51 | 0));
   }
   break;
  }
 default:
  {
   i2 = i1 + (i51 << 2) | 0;
   if (i50) do {
    HEAP32[i1 >> 2] = 0;
    i1 = i1 + 4 | 0;
   } while (i1 >>> 0 < i2 >>> 0);
  }
 }
 HEAP32[i54 >> 2] = i13;
 HEAPF64[i53 >> 3] = d31 - d3 + +HEAPF64[i53 >> 3];
 if (i38) {
  if (i4) {
   i54 = i6;
   return i54 | 0;
  }
  i54 = _neg_interleave(i6, i39) | 0;
  return i54 | 0;
 }
 if (i4) {
  i54 = i6 + -1 | 0;
  return i54 | 0;
 } else {
  i54 = _neg_interleave(i6 + 1 | 0, i39 + 1 | 0) | 0;
  return i54 | 0;
 }
 return 0;
}

function _od_pvq_search_rdo_double(i20, i19, i15, i21, d3, i16) {
 i20 = i20 | 0;
 i19 = i19 | 0;
 i15 = i15 | 0;
 i21 = i21 | 0;
 d3 = +d3;
 i16 = i16 | 0;
 var i1 = 0, d2 = 0.0, i4 = 0, d5 = 0.0, d6 = 0.0, i7 = 0, i8 = 0, d9 = 0.0, d10 = 0.0, i11 = 0, d12 = 0.0, d13 = 0.0, d14 = 0.0, d17 = 0.0, i18 = 0;
 i18 = (i19 | 0) > 0;
 if (i18) {
  i1 = 0;
  d2 = 0.0;
  do {
   d17 = +Math_abs(+(+HEAPF64[i20 + (i1 << 3) >> 3]));
   HEAPF64[i16 + 160 + (i1 << 3) >> 3] = d17;
   d2 = d2 + d17 * d17;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i19 | 0));
  d17 = d2;
 } else d17 = 0.0;
 d14 = 1.0 / +Math_sqrt(+(d17 + 1.0e-30));
 d13 = .147 / (d3 + 1.0e-30);
 if ((i15 | 0) > 2) if (i18) {
  i1 = 0;
  d2 = 0.0;
  do {
   d2 = d2 + +HEAPF64[i16 + 160 + (i1 << 3) >> 3];
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i19 | 0));
  d5 = 1.0 / d2;
  if (i18) {
   d6 = +(i15 | 0);
   i1 = 0;
   i4 = 0;
   d3 = 0.0;
   d2 = 0.0;
   do {
    d12 = +HEAPF64[i16 + 160 + (i4 << 3) >> 3];
    i8 = ~~+Math_floor(+(d5 * (d6 * d12)));
    HEAP32[i21 + (i4 << 2) >> 2] = i8;
    d3 = d3 + d12 * +(i8 | 0);
    d2 = d2 + +(Math_imul(i8, i8) | 0);
    i1 = i8 + i1 | 0;
    i4 = i4 + 1 | 0;
   } while ((i4 | 0) != (i19 | 0));
   i4 = i1;
  } else {
   i4 = 0;
   d3 = 0.0;
   d2 = 0.0;
  }
 } else {
  i4 = 0;
  d3 = 0.0;
  d2 = 0.0;
 } else if (i18) {
  i1 = 0;
  do {
   HEAP32[i21 + (i1 << 2) >> 2] = 0;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i19 | 0));
  i4 = 0;
  d3 = 0.0;
  d2 = 0.0;
 } else {
  i4 = 0;
  d3 = 0.0;
  d2 = 0.0;
 }
 d12 = 3.0 / +(i19 | 0);
 i1 = (i15 | 0) / -4 | 0;
 do if ((i4 | 0) < (i15 + -1 + i1 | 0)) {
  i8 = i1 + i15 + -1 | 0;
  if (!i18) {
   d5 = +HEAPF64[i16 + 160 >> 3];
   i1 = HEAP32[i21 >> 2] | 0;
   do {
    d3 = d3 + d5;
    d2 = d2 + +(i1 << 1 | 0) + 1.0;
    i1 = i1 + 1 | 0;
    i4 = i4 + 1 | 0;
   } while ((i4 | 0) != (i8 | 0));
   HEAP32[i21 >> 2] = i1;
   i1 = i8;
   break;
  }
  do {
   d9 = -10.0;
   d10 = 1.0;
   i7 = 0;
   i1 = 0;
   while (1) {
    d5 = d3 + +HEAPF64[i16 + 160 + (i7 << 3) >> 3];
    d6 = d2 + +(HEAP32[i21 + (i7 << 2) >> 2] << 1 | 0) + 1.0;
    d5 = d5 * d5;
    if (!i7) i11 = 17; else if (d10 * d5 > d9 * d6) i11 = 17; else {
     d5 = d9;
     d6 = d10;
    }
    if ((i11 | 0) == 17) {
     i11 = 0;
     i1 = i7;
    }
    i7 = i7 + 1 | 0;
    if ((i7 | 0) == (i19 | 0)) break; else {
     d9 = d5;
     d10 = d6;
    }
   }
   i7 = HEAP32[i21 + (i1 << 2) >> 2] | 0;
   d3 = d3 + +HEAPF64[i16 + 160 + (i1 << 3) >> 3];
   d2 = d2 + +(i7 << 1 | 0) + 1.0;
   HEAP32[i21 + (i1 << 2) >> 2] = i7 + 1;
   i4 = i4 + 1 | 0;
  } while ((i4 | 0) != (i8 | 0));
  i1 = i8;
 } else i1 = i4; while (0);
 L35 : do if ((i1 | 0) < (i15 | 0)) {
  if (!i18) {
   i4 = i16 + 160 | 0;
   while (1) {
    _od_fill_dynamic_rsqrt_table(i16, 4, d2);
    d3 = d3 + +HEAPF64[i4 >> 3];
    i11 = HEAP32[i21 >> 2] | 0;
    d2 = d2 + +(i11 << 1 | 0) + 1.0;
    HEAP32[i21 >> 2] = i11 + 1;
    i1 = i1 + 1 | 0;
    if ((i1 | 0) == (i15 | 0)) break L35;
   }
  }
  do {
   _od_fill_dynamic_rsqrt_table(i16, 4, d2);
   d6 = -1.0e5;
   i7 = 0;
   i4 = 0;
   while (1) {
    d5 = d3 + +HEAPF64[i16 + 160 + (i7 << 3) >> 3];
    d5 = +_od_custom_rsqrt_dynamic_table(i16, 4, d2, HEAP32[i21 + (i7 << 2) >> 2] | 0) * (d14 * (d5 * 2.0)) - d12 * (d13 * +(i7 | 0));
    i8 = (i7 | 0) == 0 | d5 > d6;
    i4 = i8 ? i7 : i4;
    i7 = i7 + 1 | 0;
    if ((i7 | 0) == (i19 | 0)) break; else d6 = i8 ? d5 : d6;
   }
   i11 = HEAP32[i21 + (i4 << 2) >> 2] | 0;
   d3 = d3 + +HEAPF64[i16 + 160 + (i4 << 3) >> 3];
   d2 = d2 + +(i11 << 1 | 0) + 1.0;
   HEAP32[i21 + (i4 << 2) >> 2] = i11 + 1;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i15 | 0));
 } while (0);
 if (i18) i1 = 0; else {
  d17 = d17 * d2;
  d17 = +Math_sqrt(+d17);
  d17 = d17 + 1.0e-100;
  d17 = d3 / d17;
  return +d17;
 }
 do {
  if (+HEAPF64[i20 + (i1 << 3) >> 3] < 0.0) {
   i18 = i21 + (i1 << 2) | 0;
   HEAP32[i18 >> 2] = 0 - (HEAP32[i18 >> 2] | 0);
  }
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != (i19 | 0));
 d17 = d17 * d2;
 d17 = +Math_sqrt(+d17);
 d17 = d17 + 1.0e-100;
 d17 = d3 / d17;
 return +d17;
}

function _od_pvq_synthesis_partial(i15, i12, i10, i13, i2, d7, d9, i1, i8, i14, i11) {
 i15 = i15 | 0;
 i12 = i12 | 0;
 i10 = i10 | 0;
 i13 = i13 | 0;
 i2 = i2 | 0;
 d7 = +d7;
 d9 = +d9;
 i1 = i1 | 0;
 i8 = i8 | 0;
 i14 = i14 | 0;
 i11 = i11 | 0;
 var d3 = 0.0, i4 = 0, i5 = 0, i6 = 0, i16 = 0;
 i5 = (i2 | 0) != 0;
 i6 = i13 - (i5 & 1 ^ 1) | 0;
 if ((i6 | 0) > 0) {
  i4 = 0;
  i2 = 0;
  do {
   i16 = HEAP32[i12 + (i4 << 2) >> 2] | 0;
   i2 = (Math_imul(i16, i16) | 0) + i2 | 0;
   i4 = i4 + 1 | 0;
  } while ((i4 | 0) != (i6 | 0));
  if (!i2) d3 = 0.0; else d3 = d7 / +Math_sqrt(+(+(i2 | 0)));
 } else d3 = 0.0;
 if (i5) {
  if ((i13 | 0) > 0) i1 = 0; else return;
  do {
   HEAP32[i15 + (i1 << 2) >> 2] = ~~+Math_floor(+(d3 * +(HEAP32[i12 + (i1 << 2) >> 2] | 0) * (+(HEAP16[i14 + (i1 << 1) >> 1] | 0) * .000244140625) + .5));
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i13 | 0));
  return;
 }
 d3 = d3 * +Math_sin(+d9);
 if ((i1 | 0) > 0) {
  i2 = 0;
  do {
   HEAPF64[i11 + (i2 << 3) >> 3] = d3 * +(HEAP32[i12 + (i2 << 2) >> 2] | 0);
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != (i1 | 0));
 }
 HEAPF64[i11 + (i1 << 3) >> 3] = +(0 - i8 | 0) * d7 * +Math_cos(+d9);
 if ((i6 | 0) > (i1 | 0)) do {
  i16 = i1;
  i1 = i1 + 1 | 0;
  HEAPF64[i11 + (i1 << 3) >> 3] = d3 * +(HEAP32[i12 + (i16 << 2) >> 2] | 0);
 } while ((i1 | 0) != (i6 | 0));
 _od_apply_householder(i11, i11, i10, i13);
 if ((i13 | 0) > 0) i1 = 0; else return;
 do {
  HEAP32[i15 + (i1 << 2) >> 2] = ~~+Math_floor(+(+HEAPF64[i11 + (i1 << 3) >> 3] * (+(HEAP16[i14 + (i1 << 1) >> 1] | 0) * .000244140625) + .5));
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != (i13 | 0));
 return;
}

function _od_pvq_compute_k(d6, i2, d7, i5, i3, d1, i4) {
 d6 = +d6;
 i2 = i2 | 0;
 d7 = +d7;
 i5 = i5 | 0;
 i3 = i3 | 0;
 d1 = +d1;
 i4 = i4 | 0;
 if (i5) {
  if (d6 == 0.0) {
   i5 = 0;
   return i5 | 0;
  }
  if (d6 == 1.0 & (i3 | 0) == 15 & d1 > 1.25) {
   i5 = 1;
   return i5 | 0;
  }
  i5 = ~~+Math_floor(+((d6 + -.2) * +Math_sqrt(+(+((i3 + 3 | 0) / 2 | 0 | 0))) / d1 + .5));
  i5 = (i5 | 0) > 1 ? i5 : 1;
  return i5 | 0;
 }
 if (!i2) {
  i5 = 0;
  return i5 | 0;
 }
 if (!i4) {
  i5 = ~~+Math_floor(+((+Math_sin(+d7) * d6 + -.2) * +Math_sqrt(+(+((i3 + 2 | 0) / 2 | 0 | 0))) / d1 + .5));
  i5 = (i5 | 0) > 1 ? i5 : 1;
  return i5 | 0;
 } else {
  i5 = ~~+Math_floor(+((+(i2 | 0) + -.2) * +Math_sqrt(+(+((i3 + 2 | 0) / 2 | 0 | 0))) + .5));
  i5 = (i5 | 0) > 1 ? i5 : 1;
  return i5 | 0;
 }
 return 0;
}

function _od_apply_householder(i6, i8, i7, i5) {
 i6 = i6 | 0;
 i8 = i8 | 0;
 i7 = i7 | 0;
 i5 = i5 | 0;
 var d1 = 0.0, i2 = 0, d3 = 0.0, i4 = 0;
 i4 = (i5 | 0) > 0;
 if (i4) {
  i2 = 0;
  d1 = 0.0;
 } else return;
 do {
  d3 = +HEAPF64[i7 + (i2 << 3) >> 3];
  d1 = d1 + d3 * d3;
  i2 = i2 + 1 | 0;
 } while ((i2 | 0) != (i5 | 0));
 d3 = d1 + 1.0e-100;
 if (i4) {
  i2 = 0;
  d1 = 0.0;
 } else return;
 do {
  d1 = d1 + +HEAPF64[i7 + (i2 << 3) >> 3] * +HEAPF64[i8 + (i2 << 3) >> 3];
  i2 = i2 + 1 | 0;
 } while ((i2 | 0) != (i5 | 0));
 d1 = d1 * 2.0 / d3;
 if (i4) i2 = 0; else return;
 do {
  HEAPF64[i6 + (i2 << 3) >> 3] = +HEAPF64[i8 + (i2 << 3) >> 3] - d1 * +HEAPF64[i7 + (i2 << 3) >> 3];
  i2 = i2 + 1 | 0;
 } while ((i2 | 0) != (i5 | 0));
 return;
}

function _init_tables(i1) {
 i1 = i1 | 0;
 HEAPF64[i1 >> 3] = 1.0;
 HEAPF64[i1 + 8 >> 3] = .7071067811865475;
 HEAPF64[i1 + 16 >> 3] = .5773502691896258;
 HEAPF64[i1 + 24 >> 3] = .5;
 HEAPF64[i1 + 32 >> 3] = .4472135954999579;
 HEAPF64[i1 + 40 >> 3] = .4082482904638631;
 HEAPF64[i1 + 48 >> 3] = .3779644730092272;
 HEAPF64[i1 + 56 >> 3] = .35355339059327373;
 HEAPF64[i1 + 64 >> 3] = .3333333333333333;
 HEAPF64[i1 + 72 >> 3] = .31622776601683794;
 HEAPF64[i1 + 80 >> 3] = .30151134457776363;
 HEAPF64[i1 + 88 >> 3] = .2886751345948129;
 HEAPF64[i1 + 96 >> 3] = .2773500981126146;
 HEAPF64[i1 + 104 >> 3] = .2672612419124244;
 HEAPF64[i1 + 112 >> 3] = .2581988897471611;
 HEAPF64[i1 + 120 >> 3] = .25;
 return;
}

function _od_compute_householder(i8, i6, d7, i9, i1) {
 i8 = i8 | 0;
 i6 = i6 | 0;
 d7 = +d7;
 i9 = i9 | 0;
 i1 = i1 | 0;
 var d2 = 0.0, i3 = 0, i4 = 0, d5 = 0.0;
 if ((i6 | 0) > 0) {
  i4 = 0;
  i1 = 0;
  d5 = 0.0;
  while (1) {
   d2 = +Math_abs(+(+HEAPF64[i8 + (i4 << 3) >> 3]));
   i3 = d2 > d5;
   i1 = i3 ? i4 : i1;
   i4 = i4 + 1 | 0;
   if ((i4 | 0) == (i6 | 0)) break; else d5 = i3 ? d2 : d5;
  }
 } else i1 = 0;
 i6 = i8 + (i1 << 3) | 0;
 d5 = +HEAPF64[i6 >> 3];
 i8 = d5 > 0.0 ? 1 : -1;
 HEAPF64[i6 >> 3] = d5 + +(i8 | 0) * d7;
 HEAP32[i9 >> 2] = i8;
 return i1 | 0;
}

function _od_pvq_rate(i8, i5, i9, i10, i4, i2, i3, i6, i7) {
 i8 = i8 | 0;
 i5 = i5 | 0;
 i9 = i9 | 0;
 i10 = i10 | 0;
 i4 = i4 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 var d1 = 0.0;
 d1 = +(i3 | 0);
 d1 = d1 * (+Math_log(+(+(i2 | 0) * +Math_log(+(+(i3 << 1 | 0))) / d1 + 1.0)) * 1.4426950408889634);
 if ((i8 | 0) > 0 & (i9 | 0) > -1) {
  d1 = d1 + +Math_log(+(+(i10 | 0))) * 1.4426950408889634 * .9;
  d1 = (i6 | 0) != 0 & (i7 | 0) == 0 ? d1 + 6.0 : d1;
  return +((i8 | 0) == (i5 | 0) ? d1 + -.5 : d1);
 } else return +d1;
 return 0.0;
}

function _od_pvq_compute_gain(i4, i3, i7, i6, d5, i2) {
 i4 = i4 | 0;
 i3 = i3 | 0;
 i7 = i7 | 0;
 i6 = i6 | 0;
 d5 = +d5;
 i2 = i2 | 0;
 var d1 = 0.0, d8 = 0.0;
 if ((i3 | 0) > 0) {
  d1 = 0.0;
  i2 = 0;
  do {
   d8 = +HEAPF64[i4 + (i2 << 3) >> 3];
   d1 = d1 + d8 * d8;
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != (i3 | 0));
 } else d1 = 0.0;
 d8 = +Math_sqrt(+d1);
 HEAPF64[i6 >> 3] = d8;
 return +(+_od_gain_compand(d8, i7, d5));
}

function _od_gain_expand(d4, i2, d3) {
 d4 = +d4;
 i2 = i2 | 0;
 d3 = +d3;
 var d1 = 0.0;
 if (d3 == 1.0) {
  d4 = +(i2 | 0) * d4;
  return +d4;
 }
 d1 = +(i2 | 0);
 if (d3 == 1.5) {
  d4 = d1 * .000244140625 * d4;
  d4 = d4 * 4096.0 * +Math_sqrt(+d4);
  return +d4;
 } else {
  d4 = +Math_pow(+(d1 * d4 * .000244140625), +d3) * 4096.0;
  return +d4;
 }
 return 0.0;
}

function _od_vector_is_null(i3, i2) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 var i1 = 0;
 L1 : do if ((i2 | 0) > 0) {
  i1 = 0;
  while (1) {
   if (HEAP32[i3 + (i1 << 2) >> 2] | 0) {
    i1 = 0;
    break L1;
   }
   i1 = i1 + 1 | 0;
   if ((i1 | 0) >= (i2 | 0)) {
    i1 = 1;
    break;
   }
  }
 } else i1 = 1; while (0);
 return i1 | 0;
}

function _od_fill_dynamic_rsqrt_table(i3, i4, d2) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 d2 = +d2;
 var i1 = 0;
 if ((i4 | 0) > 0) i1 = 0; else return;
 do {
  HEAPF64[i3 + 128 + (i1 << 3) >> 3] = +_od_rsqrt_table(i3, ~~(+(i1 << 1 | 0) + d2 + 1.0));
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != (i4 | 0));
 return;
}

function _od_custom_rsqrt_dynamic_table(i3, i4, d2, i1) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 d2 = +d2;
 i1 = i1 | 0;
 if ((i1 | 0) < (i4 | 0)) {
  d2 = +HEAPF64[i3 + 128 + (i1 << 3) >> 3];
  return +d2;
 } else {
  d2 = +_od_rsqrt_table(i3, ~~(+(i1 << 1 | 0) + d2 + 1.0));
  return +d2;
 }
 return 0.0;
}

function _neg_interleave(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 if ((i2 | 0) < (i1 | 0)) {
  i2 = (i1 - i2 << 1) + -1 | 0;
  return i2 | 0;
 }
 if ((i1 << 1 | 0) > (i2 | 0)) {
  i2 = i2 - i1 << 1;
  return i2 | 0;
 } else {
  i2 = i2 + -1 | 0;
  return i2 | 0;
 }
 return 0;
}

function _od_gain_compand(d2, i3, d1) {
 d2 = +d2;
 i3 = i3 | 0;
 d1 = +d1;
 if (d1 == 1.0) {
  d2 = d2 / +(i3 | 0);
  return +d2;
 } else {
  d2 = +Math_pow(+(d2 * .000244140625), +(1.0 / d1)) * 4096.0 / +(i3 | 0);
  return +d2;
 }
 return 0.0;
}

function _od_rsqrt_table(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var d3 = 0.0;
 if ((i1 | 0) < 17) {
  d3 = +HEAPF64[i2 + (i1 + -1 << 3) >> 3];
  return +d3;
 } else {
  d3 = 1.0 / +Math_sqrt(+(+(i1 | 0)));
  return +d3;
 }
 return 0.0;
}

function _od_pvq_compute_theta(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var d3 = 0.0;
 if (!i1) {
  d3 = 0.0;
  return +d3;
 }
 d3 = +(((i1 | 0) <= (i2 | 0) ? i1 + -1 ^ i2 : 0) ^ i2 | 0) * .5 * 3.141592653589793 / +(i1 | 0);
 return +d3;
}

function _od_pvq_compute_max_theta(d2, d1) {
 d2 = +d2;
 d1 = +d1;
 var i3 = 0;
 i3 = ~~+Math_floor(+(d2 * 3.141592653589793 / (d1 * 2.0) + .5));
 return (d2 < 1.4 ? 1 : i3) | 0;
}

  return { od_pvq_search_rdo_double: _od_pvq_search_rdo_double, od_pvq_rate: _od_pvq_rate, od_rsqrt_table: _od_rsqrt_table, neg_interleave: _neg_interleave, od_vector_is_null: _od_vector_is_null, od_pvq_theta: _od_pvq_theta, od_fill_dynamic_rsqrt_table: _od_fill_dynamic_rsqrt_table, od_apply_householder: _od_apply_householder, od_pvq_compute_k: _od_pvq_compute_k, od_gain_expand: _od_gain_expand, od_compute_householder: _od_compute_householder, od_gain_compand: _od_gain_compand, od_pvq_compute_max_theta: _od_pvq_compute_max_theta, od_pvq_compute_theta: _od_pvq_compute_theta, od_custom_rsqrt_dynamic_table: _od_custom_rsqrt_dynamic_table, od_pvq_synthesis_partial: _od_pvq_synthesis_partial, od_pvq_compute_gain: _od_pvq_compute_gain, init_tables: _init_tables };
})(self, null, self.HEAP);
