/*Daala video codec
Copyright (c) 2003-2010 Daala project contributors.  All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

#include<emscripten.h>

typedef int od_coeff;
# define OD_COEFF_BITS (32)

/*This is the strength reduced version of ((_a)/(1 << (_b))).
  This will not work for _b == 0, however currently this is only used for
   b == 1 anyway.*/
# define OD_UNBIASED_RSHIFT32(_a, _b) \
 (((int)(((unsigned)(_a) >> (32 - (_b))) + (_a))) >> (_b))

# define OD_DCT_RSHIFT(_a, _b) OD_UNBIASED_RSHIFT32(_a, _b)

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_bin_fdct8(od_coeff y[8], const od_coeff *x, int xstride) {
  /*31 adds, 5 shifts, 15 "muls".*/
  /*The minimum theoretical number of multiplies for a uniformly-scaled 8-point
     transform is 11, but the best I've been able to come up with for a
     reversible version with orthonormal scaling is 15.
    We pick up 3 multiplies when computing the DC, since we have an odd number
     of summation stages, leaving no chance to cancel the asymmetry in the last
     one.
    Instead, we have to implement it as a rotation by \frac{\pi}{4} using
     lifting steps.
    We pick up one more multiply when computing the Type IV DCT in the odd
     half.
    This comes from using 3 lifting steps to implement another rotation by
     \frac{\pi}{4} (with asymmetrically scaled inputs and outputs) instead of
     simply scaling two values by \sqrt{2}.*/
  int t0;
  int t1;
  int t1h;
  int t2;
  int t3;
  int t4;
  int t4h;
  int t5;
  int t6;
  int t6h;
  int t7;
  /*Initial permutation:*/
  t0 = *(x + 0*xstride);
  t4 = *(x + 1*xstride);
  t2 = *(x + 2*xstride);
  t6 = *(x + 3*xstride);
  t7 = *(x + 4*xstride);
  t3 = *(x + 5*xstride);
  t5 = *(x + 6*xstride);
  t1 = *(x + 7*xstride);
  /*+1/-1 butterflies:*/
  t1 = t0 - t1;
  t1h = OD_DCT_RSHIFT(t1, 1);
  t0 -= t1h;
  t4 += t5;
  t4h = OD_DCT_RSHIFT(t4, 1);
  t5 -= t4h;
  t3 = t2 - t3;
  t2 -= OD_DCT_RSHIFT(t3, 1);
  t6 += t7;
  t6h = OD_DCT_RSHIFT(t6, 1);
  t7 = t6h - t7;
  /*+ Embedded 4-point type-II DCT.*/
  t0 += t6h;
  t6 = t0 - t6;
  t2 = t4h - t2;
  t4 = t2 - t4;
  /*|-+ Embedded 2-point type-II DCT.*/
  /*13573/32768 ~= \sqrt{2} - 1 ~= 0.41421356237309504880168872420970*/
  t0 -= (t4*13573 + 16384) >> 15;
  /*11585/16384 ~= \sqrt{\frac{1}{2}} ~= 0.70710678118654752440084436210485*/
  t4 += (t0*11585 + 8192) >> 14;
  /*13573/32768 ~= \sqrt{2} - 1 ~= 0.41421356237309504880168872420970*/
  t0 -= (t4*13573 + 16384) >> 15;
  /*|-+ Embedded 2-point type-IV DST.*/
  /*21895/32768 ~= \frac{1 - cos(\frac{3\pi}{8})}{\sin(\frac{3\pi}{8})} ~=
     0.66817863791929891999775768652308*/
  t6 -= (t2*21895 + 16384) >> 15;
  /*15137/16384~=sin(\frac{3\pi}{8})~=0.92387953251128675612818318939679*/
  t2 += (t6*15137 + 8192) >> 14;
  /*21895/32768 ~= \frac{1 - cos(\frac{3\pi}{8})}{\sin(\frac{3\pi}{8})}~=
     0.66817863791929891999775768652308*/
  t6 -= (t2*21895 + 16384) >> 15;
  /*+ Embedded 4-point type-IV DST.*/
  /*19195/32768 ~= 2 - \sqrt{2} ~= 0.58578643762690495119831127579030*/
  t3 += (t5*19195 + 16384) >> 15;
  /*11585/16384 ~= \sqrt{\frac{1}{2}} ~= 0.70710678118654752440084436210485*/
  t5 += (t3*11585 + 8192) >> 14;
  /*7489/8192 ~= \sqrt{2}-\frac{1}{2} ~= 0.91421356237309504880168872420970*/
  t3 -= (t5*7489 + 4096) >> 13;
  t7 = OD_DCT_RSHIFT(t5, 1) - t7;
  t5 -= t7;
  t3 = t1h - t3;
  t1 -= t3;
  /*3227/32768 ~= \frac{1 - cos(\frac{\pi}{16})}{sin(\frac{\pi}{16})} ~=
     0.098491403357164253077197521291327*/
  t7 += (t1*3227 + 16384) >> 15;
  /*6393/32768 ~= sin(\frac{\pi}{16}) ~= 0.19509032201612826784828486847702*/
  t1 -= (t7*6393 + 16384) >> 15;
  /*3227/32768 ~= \frac{1 - cos(\frac{\pi}{16})}{sin(\frac{\pi}{16})} ~=
     0.098491403357164253077197521291327*/
  t7 += (t1*3227 + 16384) >> 15;
  /*2485/8192 ~= \frac{1 - cos(\frac{3\pi}{16})}{sin(\frac{3\pi}{16})} ~=
     0.30334668360734239167588394694130*/
  t5 += (t3*2485 + 4096) >> 13;
  /*18205/32768 ~= sin(\frac{3\pi}{16}) ~= 0.55557023301960222474283081394853*/
  t3 -= (t5*18205 + 16384) >> 15;
  /*2485/8192 ~= \frac{1 - cos(\frac{3\pi}{16})}{sin(\frac{3\pi}{16})} ~=
     0.30334668360734239167588394694130*/
  t5 += (t3*2485 + 4096) >> 13;
  y[0] = (od_coeff)t0;
  y[1] = (od_coeff)t1;
  y[2] = (od_coeff)t2;
  y[3] = (od_coeff)t3;
  y[4] = (od_coeff)t4;
  y[5] = (od_coeff)t5;
  y[6] = (od_coeff)t6;
  y[7] = (od_coeff)t7;
}

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_bin_idct8(od_coeff *x, int xstride, const od_coeff y[16]) {
  int t0;
  int t1;
  int t1h;
  int t2;
  int t3;
  int t4;
  int t4h;
  int t5;
  int t6;
  int t6h;
  int t7;
  t0 = y[0];
  t1 = y[1];
  t2 = y[2];
  t3 = y[3];
  t4 = y[4];
  t5 = y[5];
  t6 = y[6];
  t7 = y[7];
  t5 -= (t3*2485 + 4096) >> 13;
  t3 += (t5*18205 + 16384) >> 15;
  t5 -= (t3*2485 + 4096) >> 13;
  t7 -= (t1*3227 + 16384) >> 15;
  t1 += (t7*6393 + 16384) >> 15;
  t7 -= (t1*3227 + 16384) >> 15;
  t1 += t3;
  t1h = OD_DCT_RSHIFT(t1, 1);
  t3 = t1h - t3;
  t5 += t7;
  t7 = OD_DCT_RSHIFT(t5, 1) - t7;
  t3 += (t5*7489 + 4096) >> 13;
  t5 -= (t3*11585 + 8192) >> 14;
  t3 -= (t5*19195 + 16384) >> 15;
  t6 += (t2*21895 + 16384) >> 15;
  t2 -= (t6*15137 + 8192) >> 14;
  t6 += (t2*21895 + 16384) >> 15;
  t0 += (t4*13573 + 16384) >> 15;
  t4 -= (t0*11585 + 8192) >> 14;
  t0 += (t4*13573 + 16384) >> 15;
  t4 = t2 - t4;
  t4h = OD_DCT_RSHIFT(t4, 1);
  t2 = t4h - t2;
  t6 = t0 - t6;
  t6h = OD_DCT_RSHIFT(t6, 1);
  t0 -= t6h;
  t7 = t6h - t7;
  t6 -= t7;
  t2 += OD_DCT_RSHIFT(t3, 1);
  t3 = t2 - t3;
  t5 += t4h;
  t4 -= t5;
  t0 += t1h;
  t1 = t0 - t1;
  *(x + 0*xstride) = (od_coeff)t0;
  *(x + 1*xstride) = (od_coeff)t4;
  *(x + 2*xstride) = (od_coeff)t2;
  *(x + 3*xstride) = (od_coeff)t6;
  *(x + 4*xstride) = (od_coeff)t7;
  *(x + 5*xstride) = (od_coeff)t3;
  *(x + 6*xstride) = (od_coeff)t5;
  *(x + 7*xstride) = (od_coeff)t1;
}

EMSCRIPTEN_KEEPALIVE
void od_bin_fdct8x8(od_coeff *y, int ystride, const od_coeff *x, int xstride, od_coeff z[64]) {
  int i;
  for (i = 0; i < 8; i++) od_bin_fdct8(z + 8*i, x + i, xstride);
  for (i = 0; i < 8; i++) od_bin_fdct8(y + ystride*i, z + i, 8);
}

EMSCRIPTEN_KEEPALIVE
void od_bin_idct8x8(od_coeff *x, int xstride, const od_coeff *y, int ystride, od_coeff z[64]) {
  int i;
  for (i = 0; i < 8; i++) od_bin_idct8(z + i, 8, y + ystride*i);
  for (i = 0; i < 8; i++) od_bin_idct8(x + i, xstride, z + 8*i);
}
