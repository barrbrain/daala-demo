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

/*Pre-/post-filter pairs of various sizes.
  For a FIR, PR, LP filter bank, the pre-filter must have the structure:

   0.5*{{I,J},{J,-I}}*{{U,0},{0,V}},{{I,J},{J,-I}}

  To create a pre-/post-filter for an M-sample block transform, I, J, U and V
   are blocks of size floor(M/2).
  I is the identity, J is the reversal matrix, and U and V are arbitrary
   invertible matrices.
  If U and V are orthonormal, then the pre-/post-filters are orthonormal.
  Otherwise they are merely biorthogonal.
  For filters with larger inputs, multiple pre-/post-filter stages can be used.
  However, one level should be sufficient to eliminate blocking artifacts, and
   additional levels would expand the influence of ringing artifacts.

  All the filters here are an even narrower example of the above structure.
  U is taken to be the identity, as it does not help much with energy
   compaction.
  V can be chosen so that the filter pair is (1,2) regular, assuming a block
   filter with 0 DC leakage, such as the DCT.
  This may be particularly important for the way that motion-compensated
   prediction is done.
  A 2-regular synthesis filter can reproduce a linear ramp from just the DC
   coefficient, which matches the linearly interpolated offsets that were
   subtracted out of the motion-compensation phase.

  In order to yield a fast implementation, the V filter is chosen to be of the
   form:
    x0 -s0----------...----+---- y0
            p0 |           | u0
    x1 -s1-----+----...--+------ y1
              p1 |       | u1
    x2 -s2-------+--...+-------- y2
                p2 |   | u2
    x3 -s3---------+...--------- y3
                     .
                     .
                     .
  Here, s(i) is a scaling factor, such that s(i) >= 1, to preserve perfect
   reconstruction given an integer implementation.
  p(i) and u(i) are arbitrary, so long as p(i)u(i) != -1, to keep the transform
   invertible.
  In order to make V (1,2) regular, we have the conditions:
    s0+M*u0==M
    (2*i+1)*s(i)+M*u(i)+M*(1-u(i-1))*p(i-1)==M, i in [1..K-2]
    (M-1)*s(K-1)+M*(1-u(K-2))*p(K-2)==M
   where K=floor(M/2).
  These impose additonal constraints on u(i) and p(i), derived from the
   constraints above, such as u(0) <= (M-1)/M.
  It is desirable to have u(i), p(i) and 1/s(i) be dyadic rationals, the latter
   to provide for a fast inverse transform.
  However, as can be seen by the constraints, it is very easy to make u(i) and
   p(i) be dyadic, or 1/s(i) be dyadic, but solutions with all of them dyadic
   are very sparse, and require at least s(0) to be a power of 2.
  Such solutions do not have a good coding gain, and so we settle for having
   s(i) be dyadic instead of 1/s(i).

  Or we use the form
    x0 -s0---------------+---- y0
                    p0 | | u0
    x1 -s1-----------+-+------ y1
                p1 | | u1
    x2 -s2-------+-+---------- y2
            p2 | | u2
    x3 -s3-----+-------------- y3
                 .
                 .
                 .
   which yields slightly higher coding gains, but the conditions for
    (1,2) regularity
    s0+M*u0==M
    (2*i+1)*s(i)+M*u(i)+(2*i-1)*s(i-1)*p(i-1)==M, i in [1..K-2]
    (M-1)*s(K-1)+(M-3)*s(K-2)*p(K-2)==M
   make dyadic rational approximations more sparse, such that the coding gains
   of the approximations are actually lower. This is selected when the TYPE3
   defines are set.

  The maximum denominator for all coefficients was allowed to be 64.*/

#include<emscripten.h>
typedef int od_coeff;
# define OD_COEFF_BITS (32)

/*R=f
  6-bit
  Subset3_2d_Cg = 16.7948051638528391
  This filter has some of the scale factors
   forced to one to reduce complexity. Without
   this constraint we get a filter with Subset3_2d_Cg
   of 16.8035257369844686. The small cg loss is likely
   worth the reduction in multiplies and adds.*/
/*Optimal 1d subset3 Cg*/
# define OD_FILTER_PARAMS8_0 (93)
# define OD_FILTER_PARAMS8_1 (72)
# define OD_FILTER_PARAMS8_2 (73)
# define OD_FILTER_PARAMS8_3 (78)
# define OD_FILTER_PARAMS8_4 (-28)
# define OD_FILTER_PARAMS8_5 (-23)
# define OD_FILTER_PARAMS8_6 (-10)
# define OD_FILTER_PARAMS8_7 (50)
# define OD_FILTER_PARAMS8_8 (37)
# define OD_FILTER_PARAMS8_9 (23)

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_pre_filter8(od_coeff _y[8], const od_coeff _x[8]) {
  int t[8];
  /*+1/-1 butterflies (required for FIR, PR, LP).*/
  t[7] = _x[0]-_x[7];
  t[6] = _x[1]-_x[6];
  t[5] = _x[2]-_x[5];
  t[4] = _x[3]-_x[4];
  t[3] = _x[3]-(t[4]>>1);
  t[2] = _x[2]-(t[5]>>1);
  t[1] = _x[1]-(t[6]>>1);
  t[0] = _x[0]-(t[7]>>1);
  /*U filter (arbitrary invertible, omitted).*/
  /*V filter (arbitrary invertible, can be optimized for speed or accuracy).*/
  /*Scaling factors: the biorthogonal part.*/
  /*Note: t[i]+=t[i]>>(OD_COEFF_BITS-1)&1; is equivalent to: if(t[i]>0)t[i]++;
    This step ensures that the scaling is trivially invertible on the
     decoder's side, with perfect reconstruction.*/
  t[4] = (t[4]*OD_FILTER_PARAMS8_0)>>6;
  t[4] += -t[4]>>(OD_COEFF_BITS-1)&1;
  t[5] = (t[5]*OD_FILTER_PARAMS8_1)>>6;
  t[5] += -t[5]>>(OD_COEFF_BITS-1)&1;
  t[6] = (t[6]*OD_FILTER_PARAMS8_2)>>6;
  t[6] += -t[6]>>(OD_COEFF_BITS-1)&1;
  t[7] = (t[7]*OD_FILTER_PARAMS8_3)>>6;
  t[7] += -t[7]>>(OD_COEFF_BITS-1)&1;
  /*Rotations:*/
  t[7] += (t[6]*OD_FILTER_PARAMS8_6+32)>>6;
  t[6] += (t[7]*OD_FILTER_PARAMS8_9+32)>>6;
  t[6] += (t[5]*OD_FILTER_PARAMS8_5+32)>>6;
  t[5] += (t[6]*OD_FILTER_PARAMS8_8+32)>>6;
  t[5] += (t[4]*OD_FILTER_PARAMS8_4+32)>>6;
  t[4] += (t[5]*OD_FILTER_PARAMS8_7+32)>>6;
  /*More +1/-1 butterflies (required for FIR, PR, LP).*/
  t[0] += t[7]>>1;
  _y[0] = (od_coeff)t[0];
  t[1] += t[6]>>1;
  _y[1] = (od_coeff)t[1];
  t[2] += t[5]>>1;
  _y[2] = (od_coeff)t[2];
  t[3] += t[4]>>1;
  _y[3] = (od_coeff)t[3];
  _y[4] = (od_coeff)(t[3]-t[4]);
  _y[5] = (od_coeff)(t[2]-t[5]);
  _y[6] = (od_coeff)(t[1]-t[6]);
  _y[7] = (od_coeff)(t[0]-t[7]);
}

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_post_filter8(od_coeff _x[8], const od_coeff _y[8]) {
  int t[8];
  t[7] = _y[0]-_y[7];
  t[6] = _y[1]-_y[6];
  t[5] = _y[2]-_y[5];
  t[4] = _y[3]-_y[4];
  t[3] = _y[3]-(t[4]>>1);
  t[2] = _y[2]-(t[5]>>1);
  t[1] = _y[1]-(t[6]>>1);
  t[0] = _y[0]-(t[7]>>1);
  t[4] -= (t[5]*OD_FILTER_PARAMS8_7+32)>>6;
  t[5] -= (t[4]*OD_FILTER_PARAMS8_4+32)>>6;
  t[5] -= (t[6]*OD_FILTER_PARAMS8_8+32)>>6;
  t[6] -= (t[5]*OD_FILTER_PARAMS8_5+32)>>6;
  t[6] -= (t[7]*OD_FILTER_PARAMS8_9+32)>>6;
  t[7] -= (t[6]*OD_FILTER_PARAMS8_6+32)>>6;
  t[7] = (t[7]<<6)/OD_FILTER_PARAMS8_3;
  t[6] = (t[6]<<6)/OD_FILTER_PARAMS8_2;
  t[5] = (t[5]<<6)/OD_FILTER_PARAMS8_1;
  t[4] = (t[4]<<6)/OD_FILTER_PARAMS8_0;
  t[0] += t[7]>>1;
  _x[0] = (od_coeff)t[0];
  t[1] += t[6]>>1;
  _x[1] = (od_coeff)t[1];
  t[2] += t[5]>>1;
  _x[2] = (od_coeff)t[2];
  t[3] += t[4]>>1;
  _x[3] = (od_coeff)t[3];
  _x[4] = (od_coeff)(t[3]-t[4]);
  _x[5] = (od_coeff)(t[2]-t[5]);
  _x[6] = (od_coeff)(t[1]-t[6]);
  _x[7] = (od_coeff)(t[0]-t[7]);
}

EMSCRIPTEN_KEEPALIVE
void lapvert(od_coeff *bufptr, od_coeff pixels) {
  od_coeff i = 0;
  while (i < pixels * 3) {
    od_pre_filter8(bufptr + i, bufptr + i);
    i = i + 8;
  }
}

EMSCRIPTEN_KEEPALIVE
void unlapvert(od_coeff *bufptr, od_coeff pixels) {
  od_coeff i = 0;
  while (i < pixels * 3) {
    od_post_filter8(bufptr + i, bufptr + i);
    i = i + 8;
  }
}

EMSCRIPTEN_KEEPALIVE
void laphorz(od_coeff *bufptr, od_coeff w, od_coeff h, od_coeff *t) {
  int i = 4;
  int j = 0;
  int p = 0;
  while (i + 8 < h * 3) {
    j = 0;
    while (j < w) {
      p = (i - 1) * w + j;
      t[0] = bufptr[p += w];
      t[1] = bufptr[p += w];
      t[2] = bufptr[p += w];
      t[3] = bufptr[p += w];
      t[4] = bufptr[p += w];
      t[5] = bufptr[p += w];
      t[6] = bufptr[p += w];
      t[7] = bufptr[p += w];
      od_pre_filter8(t, t);
      p -= 8 * w;
      bufptr[p += w] = t[0];
      bufptr[p += w] = t[1];
      bufptr[p += w] = t[2];
      bufptr[p += w] = t[3];
      bufptr[p += w] = t[4];
      bufptr[p += w] = t[5];
      bufptr[p += w] = t[6];
      bufptr[p += w] = t[7];
      j = j + 1;
    }
    i = i + 8;
  }
}

EMSCRIPTEN_KEEPALIVE
void unlaphorz(od_coeff *bufptr, od_coeff w, od_coeff h, od_coeff *t) {
  int i = 4;
  int j = 0;
  int p = 0;
  while (i + 8 < h * 3) {
    j = 0;
    while (j < w) {
      p = (i - 1) * w + j;
      t[0] = bufptr[p += w];
      t[1] = bufptr[p += w];
      t[2] = bufptr[p += w];
      t[3] = bufptr[p += w];
      t[4] = bufptr[p += w];
      t[5] = bufptr[p += w];
      t[6] = bufptr[p += w];
      t[7] = bufptr[p += w];
      od_post_filter8(t, t);
      p -= 8 * w;
      bufptr[p += w] = t[0];
      bufptr[p += w] = t[1];
      bufptr[p += w] = t[2];
      bufptr[p += w] = t[3];
      bufptr[p += w] = t[4];
      bufptr[p += w] = t[5];
      bufptr[p += w] = t[6];
      bufptr[p += w] = t[7];
      j = j + 1;
    }
    i = i + 8;
  }
}
