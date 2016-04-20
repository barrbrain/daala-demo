var pvq_encoder = (function(global,env,buffer) {
'use asm';
  
var HEAP32 = new global.Int32Array(buffer);
var HEAPF64 = new global.Float64Array(buffer);
var LOG2E = global.Math.LOG2E;
var Math_floor = global.Math.floor;
var Math_imul = global.Math.imul;
var Math_log = global.Math.log;
var Math_sqrt = global.Math.sqrt;

function _od_pvq_search_rdo_double(i21, i20, i16, i22, d3, i17) {
 i21 = i21 | 0;
 i20 = i20 | 0;
 i16 = i16 | 0;
 i22 = i22 | 0;
 d3 = +d3;
 i17 = i17 | 0;
 var i1 = 0, d2 = 0.0, i4 = 0, d5 = 0.0, d6 = 0.0, i7 = 0, i8 = 0, d9 = 0.0, d10 = 0.0, i11 = 0, i12 = 0, d13 = 0.0, d14 = 0.0, d15 = 0.0, d18 = 0.0, i19 = 0;
 i19 = (i20 | 0) > 0;
 if (i19) {
  i1 = 0;
  d2 = 0.0;
  do {
   i11 = HEAP32[i21 + (i1 << 2) >> 2] | 0;
   d18 = +(((i11 | 0) > -1 ? i11 : 0 - i11 | 0) | 0);
   HEAPF64[i17 + 160 + (i1 << 3) >> 3] = d18;
   d2 = d2 + d18 * d18;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i20 | 0));
  d18 = d2;
 } else d18 = 0.0;
 d15 = 1.0 / +Math_sqrt(+(d18 + 1.0e-30));
 d14 = .147 / (d3 + 1.0e-30);
 if ((i16 | 0) > 2) if (i19) {
  i1 = 0;
  d2 = 0.0;
  do {
   d2 = d2 + +HEAPF64[i17 + 160 + (i1 << 3) >> 3];
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i20 | 0));
  d5 = 1.0 / d2;
  if (i19) {
   d6 = +(i16 | 0);
   i1 = 0;
   i4 = 0;
   d3 = 0.0;
   d2 = 0.0;
   do {
    d13 = +HEAPF64[i17 + 160 + (i4 << 3) >> 3];
    i11 = ~~+Math_floor(+(d5 * (d6 * d13)));
    HEAP32[i22 + (i4 << 2) >> 2] = i11;
    d3 = d3 + d13 * +(i11 | 0);
    d2 = d2 + +(Math_imul(i11, i11) | 0);
    i1 = i11 + i1 | 0;
    i4 = i4 + 1 | 0;
   } while ((i4 | 0) != (i20 | 0));
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
 } else if (i19) {
  i1 = 0;
  do {
   HEAP32[i22 + (i1 << 2) >> 2] = 0;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i20 | 0));
  i4 = 0;
  d3 = 0.0;
  d2 = 0.0;
 } else {
  i4 = 0;
  d3 = 0.0;
  d2 = 0.0;
 }
 d13 = 3.0 / +(i20 | 0);
 i1 = (i16 | 0) / -4 | 0;
 i11 = i16 + -1 + i1 | 0;
 do if ((i4 | 0) < (i11 | 0)) {
  i8 = i1 + i16 + -1 | 0;
  if (!i19) {
   d5 = +HEAPF64[i17 + 160 >> 3];
   i1 = HEAP32[i22 >> 2] | 0;
   do {
    d3 = d3 + d5;
    d2 = d2 + +(i1 << 1 | 0) + 1.0;
    i1 = i1 + 1 | 0;
    i4 = i4 + 1 | 0;
   } while ((i4 | 0) != (i8 | 0));
   HEAP32[i22 >> 2] = i1;
   i1 = i11;
   break;
  }
  do {
   d9 = -10.0;
   d10 = 1.0;
   i7 = 0;
   i1 = 0;
   while (1) {
    d5 = d3 + +HEAPF64[i17 + 160 + (i7 << 3) >> 3];
    d6 = d2 + +(HEAP32[i22 + (i7 << 2) >> 2] << 1 | 0) + 1.0;
    d5 = d5 * d5;
    if (!i7) i12 = 16; else if (d10 * d5 > d9 * d6) i12 = 16; else {
     d5 = d9;
     d6 = d10;
    }
    if ((i12 | 0) == 16) {
     i12 = 0;
     i1 = i7;
    }
    i7 = i7 + 1 | 0;
    if ((i7 | 0) == (i20 | 0)) break; else {
     d9 = d5;
     d10 = d6;
    }
   }
   d3 = d3 + +HEAPF64[i17 + 160 + (i1 << 3) >> 3];
   i7 = i22 + (i1 << 2) | 0;
   i1 = HEAP32[i7 >> 2] | 0;
   d2 = d2 + +(i1 << 1 | 0) + 1.0;
   HEAP32[i7 >> 2] = i1 + 1;
   i4 = i4 + 1 | 0;
  } while ((i4 | 0) != (i8 | 0));
  i1 = i11;
 } else i1 = i4; while (0);
 L35 : do if ((i1 | 0) < (i16 | 0)) {
  if (!i19) {
   i4 = i17 + 160 | 0;
   while (1) {
    _od_fill_dynamic_rsqrt_table(i17, 4, d2);
    d3 = d3 + +HEAPF64[i4 >> 3];
    i12 = HEAP32[i22 >> 2] | 0;
    d2 = d2 + +(i12 << 1 | 0) + 1.0;
    HEAP32[i22 >> 2] = i12 + 1;
    i1 = i1 + 1 | 0;
    if ((i1 | 0) == (i16 | 0)) break L35;
   }
  }
  do {
   _od_fill_dynamic_rsqrt_table(i17, 4, d2);
   d6 = -1.0e5;
   i7 = 0;
   i4 = 0;
   while (1) {
    d5 = d3 + +HEAPF64[i17 + 160 + (i7 << 3) >> 3];
    d5 = +_od_custom_rsqrt_dynamic_table(i17, 4, d2, HEAP32[i22 + (i7 << 2) >> 2] | 0) * (d15 * (d5 * 2.0)) - d13 * (d14 * +(i7 | 0));
    i8 = (i7 | 0) == 0 | d5 > d6;
    i4 = i8 ? i7 : i4;
    i7 = i7 + 1 | 0;
    if ((i7 | 0) == (i20 | 0)) break; else d6 = i8 ? d5 : d6;
   }
   d3 = d3 + +HEAPF64[i17 + 160 + (i4 << 3) >> 3];
   i12 = i22 + (i4 << 2) | 0;
   i11 = HEAP32[i12 >> 2] | 0;
   d2 = d2 + +(i11 << 1 | 0) + 1.0;
   HEAP32[i12 >> 2] = i11 + 1;
   i1 = i1 + 1 | 0;
  } while ((i1 | 0) != (i16 | 0));
 } while (0);
 if (i19) i1 = 0; else {
  d18 = d18 * d2;
  d18 = +Math_sqrt(+d18);
  d18 = d18 + 1.0e-100;
  d18 = d3 / d18;
  return +d18;
 }
 do {
  if ((HEAP32[i21 + (i1 << 2) >> 2] | 0) < 0) {
   i19 = i22 + (i1 << 2) | 0;
   HEAP32[i19 >> 2] = 0 - (HEAP32[i19 >> 2] | 0);
  }
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != (i20 | 0));
 d18 = d18 * d2;
 d18 = +Math_sqrt(+d18);
 d18 = d18 + 1.0e-100;
 d18 = d3 / d18;
 return +d18;
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

function _init_tables(i2) {
 i2 = i2 | 0;
 var i1 = 0;
 i1 = 1;
 do {
  HEAPF64[i2 + (i1 + -1 << 3) >> 3] = 1.0 / +Math_sqrt(+(+(i1 | 0)));
  i1 = i1 + 1 | 0;
 } while ((i1 | 0) != 17);
 return;
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
 d1 = d1 * (+Math_log(+(+(i2 | 0) * +Math_log(+(+(i3 << 1 | 0))) / d1 + 1.0)) * LOG2E);
 if ((i8 | 0) > 0 & (i9 | 0) > -1) {
  d1 = d1 + +Math_log(+(+(i10 | 0))) * LOG2E * .9;
  d1 = (i6 | 0) != 0 & (i7 | 0) == 0 ? d1 + 6.0 : d1;
  return +((i8 | 0) == (i5 | 0) ? d1 + -.5 : d1);
 } else return +d1;
 return 0.0;
}

  return { od_pvq_search_rdo_double: _od_pvq_search_rdo_double, init_tables: _init_tables, od_rsqrt_table: _od_rsqrt_table, od_custom_rsqrt_dynamic_table: _od_custom_rsqrt_dynamic_table, od_fill_dynamic_rsqrt_table: _od_fill_dynamic_rsqrt_table, od_vector_is_null: _od_vector_is_null, od_pvq_rate: _od_pvq_rate };
})(window, null, window.HEAP);
