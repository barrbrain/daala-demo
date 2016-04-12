/*Daala video codec
Copyright (c) 2014-2016 Daala project contributors.  All rights reserved.

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

#include <stdlib.h>
#include <emscripten.h>
typedef int od_coeff;
# define OD_COEFF_BITS (32)
# define OD_COEFF_SHIFT (4)

# define OD_MINI(a, b) ((a) ^ (((b) ^ (a)) & -((b) < (a))))

# define OD_CLZ0 (32)
# define OD_CLZ(x) (__builtin_clz(x))
# define OD_ILOG_NZ(x) (OD_CLZ0 - OD_CLZ(x))
# define OD_ILOG(x) (OD_ILOG_NZ(x) & -!!(x))

/*Smallest blocks are 8x8*/
# define OD_LOG_BSIZE0 (3)
/*There are 1 block sizes total (8x8).*/
# define OD_NBSIZES    (1)
/*The log of the maximum length of the side of a block.*/
# define OD_LOG_BSIZE_MAX (OD_LOG_BSIZE0 + OD_NBSIZES - 1)
/*The maximum length of the side of a block.*/
# define OD_BSIZE_MAX     (1 << OD_LOG_BSIZE_MAX)
/*The maximum number of quad tree levels when splitting a super block.*/
# define OD_MAX_SB_SPLITS (OD_NBSIZES - 1)

#define OD_DERING_LEVELS (6)
typedef int od_dering_in;

#define OD_DERING_NBLOCKS (OD_BSIZE_MAX/8)

#define OD_FILT_BORDER (3)
#define OD_FILT_BSTRIDE (OD_BSIZE_MAX + 2*OD_FILT_BORDER)

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
static void init_tables(volatile int *x) {
  int i;
  int stride = OD_FILT_BSTRIDE;
  *x++ = -1*stride + 1, *x++ = -2*stride + 2, *x++ = -3*stride + 3,
  *x++ =  0*stride + 1, *x++ = -1*stride + 2, *x++ = -1*stride + 3,
  *x++ =  0*stride + 1, *x++ =  0*stride + 2, *x++ =  0*stride + 3,
  *x++ =  0*stride + 1, *x++ =  1*stride + 2, *x++ =  1*stride + 3,
  *x++ =  1*stride + 1, *x++ =  2*stride + 2, *x++ =  3*stride + 3,
  *x++ =  1*stride + 0, *x++ =  2*stride + 1, *x++ =  3*stride + 1,
  *x++ =  1*stride + 0, *x++ =  2*stride + 0, *x++ =  3*stride + 0,
  *x++ =  1*stride + 0, *x++ =  2*stride - 1, *x++ =  3*stride - 1;
/* This table approximates x^0.16 with the index being log2(x). It is clamped
   to [-.5, 3]. The table is computed as:
   round(256*min(3, max(.5, 1.08*(sqrt(2)*2.^([0:17]+8)/256/256).^.16))) */
  *x++ = 128, *x++ = 134, *x++ = 150, *x++ = 168,
  *x++ = 188, *x++ = 210, *x++ = 234, *x++ = 262,
  *x++ = 292, *x++ = 327, *x++ = 365, *x++ = 408,
  *x++ = 455, *x++ = 509, *x++ = 569, *x++ = 635,
  *x++ = 710, *x++ = 768;
/* Instead of dividing by n between 2 and 8, we multiply by 3*5*7*8/n.
     The output is then 840 times larger, but we don't care for finding
     the max. */
  for (*x++ = 0, i = 1; i <= 8; i++) *x++ = 840 / i;
};


/* Detect direction. 0 means 45-degree up-right, 2 is horizontal, and so on.
   The search minimizes the weighted variance along all the lines in a
   particular direction, i.e. the squared error between the input and a
   "predicted" block where each pixel is replaced by the average along a line
   in a particular direction. Since each direction have the same sum(x^2) term,
   that term is never computed. See Section 2, step 2, of:
   http://jmvalin.ca/notes/intra_paint.pdf */
EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
int od_dir_find8(const od_dering_in *img, int stride, int *tables) {
  int i;
  int best_cost = 0;
  int best_dir = 0;
  int var;
  const int (*OD_DIRECTION_OFFSETS_TABLE)[3] = (int(*)[3])tables;
  const int *OD_THRESH_TABLE_Q8 = tables + 8 * 3;
  const int *div_table = OD_THRESH_TABLE_Q8 + 18;
  int *cost = tables + (8 * 3) + 18 + 10;
  int (*partial)[15] = (int(*)[15])(cost + 8);
  volatile int *_rw = cost;
  for (i = 0; i < 8 * 16; i++) _rw[i] = 0;
  for (i = 0; i < 8; i++) {
    int j;
    for (j = 0; j < 8; j++) {
      int x;
      x = img[i*stride + j] >> OD_COEFF_SHIFT;
      partial[0][i + j] += x;
      partial[1][i + j/2] += x;
      partial[2][i] += x;
      partial[3][3 + i - j/2] += x;
      partial[4][7 + i - j] += x;
      partial[5][3 - i/2 + j] += x;
      partial[6][j] += x;
      partial[7][i/2 + j] += x;
    }
  }
  for (i = 0; i < 8; i++) {
    cost[2] += partial[2][i]*partial[2][i];
    cost[6] += partial[6][i]*partial[6][i];
  }
  cost[2] *= div_table[8];
  cost[6] *= div_table[8];
  for (i = 0; i < 7; i++) {
    cost[0] += (partial[0][i]*partial[0][i]
     + partial[0][14 - i]*partial[0][14 - i])*div_table[i + 1];
    cost[4] += (partial[4][i]*partial[4][i]
     + partial[4][14 - i]*partial[4][14 - i])*div_table[i + 1];
  }
  cost[0] += partial[0][7]*partial[0][7]*div_table[8];
  cost[4] += partial[4][7]*partial[4][7]*div_table[8];
  for (i = 1; i < 8; i += 2) {
    int j;
    for (j = 0; j < 4 + 1; j++) {
      cost[i] += partial[i][3 + j]*partial[i][3 + j];
    }
    cost[i] *= div_table[8];
    for (j = 0; j < 4 - 1; j++) {
      cost[i] += (partial[i][j]*partial[i][j]
       + partial[i][10 - j]*partial[i][10 - j])*div_table[2*j + 2];
    }
  }
  for (i = 0; i < 8; i++) {
    if (cost[i] > best_cost) {
      best_cost = cost[i];
      best_dir = i;
    }
  }
  /* Difference between the optimal variance and the variance along the
     orthogonal direction. Again, the sum(x^2) terms cancel out. */
  var = best_cost - cost[(best_dir + 4) & 7];
  /* We'd normally divide by 840, but dividing by 1024 is close enough
     for what we're going to do with this. */
  var >>= 10;
  /* We use the variance of 8x8 blocks to adjust the threshold. */
  var = OD_MINI(32767, var >> 6);
  return (OD_THRESH_TABLE_Q8[OD_ILOG(var)] << 3) | best_dir;
}

#define OD_DERING_VERY_LARGE (30000)
#define OD_DERING_INBUF_SIZE ((OD_BSIZE_MAX + 2*OD_FILT_BORDER)*\
 (OD_BSIZE_MAX + 2*OD_FILT_BORDER))

/* Smooth in the direction detected. */
EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_filter_dering_direction_8x8_c(int *y, int ystride,
 const int *in, int threshold, int dir, const int *tables) {
  int i;
  int j;
  int k;
  int ln = 3;
  static const int taps[3] = {3, 2, 1};
  const int (*OD_DIRECTION_OFFSETS_TABLE)[3] = (const int(*)[3])tables;
  for (i = 0; i < 1 << ln; i++) {
    for (j = 0; j < 1 << ln; j++) {
      int sum;
      int xx;
      int yy;
      xx = in[i*OD_FILT_BSTRIDE + j];
      sum= 0;
      for (k = 0; k < 3; k++) {
        int p0;
        int p1;
        p0 = in[i*OD_FILT_BSTRIDE + j + OD_DIRECTION_OFFSETS_TABLE[dir][k]]
         - xx;
        p1 = in[i*OD_FILT_BSTRIDE + j - OD_DIRECTION_OFFSETS_TABLE[dir][k]]
         - xx;
        if (abs(p0) < threshold) sum += taps[k]*p0;
        if (abs(p1) < threshold) sum += taps[k]*p1;
      }
      yy = xx + ((sum + 8) >> 4);
      y[i*ystride + j] = yy;
    }
  }
}

/* Smooth in the direction orthogonal to what was detected. */
EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_filter_dering_orthogonal_8x8_c(int *y, int ystride,
 const int *in, const od_dering_in *x, int xstride, int threshold,
 int dir, const int *tables) {
  int i;
  int j;
  int offset;
  int ln = 3;
  const int (*OD_DIRECTION_OFFSETS_TABLE)[3] = (const int(*)[3])tables;
  if (dir > 0 && dir < 4) offset = OD_FILT_BSTRIDE;
  else offset = 1;
  for (i = 0; i < 1 << ln; i++) {
    for (j = 0; j < 1 << ln; j++) {
      int athresh;
      int yy;
      int sum;
      int p;
      /* Deringing orthogonal to the direction uses a tighter threshold
         because we want to be conservative. We've presumably already
         achieved some deringing, so the amount of change is expected
         to be low. Also, since we might be filtering across an edge, we
         want to make sure not to blur it. That being said, we might want
         to be a little bit more aggressive on pure horizontal/vertical
         since the ringing there tends to be directional, so it doesn't
         get removed by the directional filtering. */
      athresh = OD_MINI(threshold, threshold/3
       + abs(in[i*OD_FILT_BSTRIDE + j] - x[i*xstride + j]));
      yy = in[i*OD_FILT_BSTRIDE + j];
      sum = 0;
      p = in[i*OD_FILT_BSTRIDE + j + offset] - yy;
      if (abs(p) < athresh) sum += p;
      p = in[i*OD_FILT_BSTRIDE + j - offset] - yy;
      if (abs(p) < athresh) sum += p;
      p = in[i*OD_FILT_BSTRIDE + j + 2*offset] - yy;
      if (abs(p) < athresh) sum += p;
      p = in[i*OD_FILT_BSTRIDE + j - 2*offset] - yy;
      if (abs(p) < athresh) sum += p;
      y[i*ystride + j] = yy + ((3*sum + 8) >> 4);
    }
  }
}

EMSCRIPTEN_KEEPALIVE
__attribute__((noinline))
void od_dering(int *y, int ystride,
 const od_dering_in *x, int xstride,
 int pli, int threshold, int *tables) {
  int i;
  int j;
  int thresh;
  int dir = 0;
  int *in = tables + (8 * 3) + 18 + 10 + 8 + (8* 15);
  in += 3*OD_FILT_BSTRIDE+3;
  for (i = -3; i < 8 + 3; i++) {
    for (j = -3; j < 8 + 3; j++) {
      in[i*OD_FILT_BSTRIDE + j] = x[i*ystride + j];
    }
  }
  if (pli == 0) {
    dir = od_dir_find8(x, xstride, tables);
    thresh = (threshold * (dir >> 3) + 128) >> 8;
    dir &= 7;
  }
  else {
    thresh = threshold;
  }
  od_filter_dering_direction_8x8_c(y, ystride, in, thresh, dir, tables);
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      in[i*OD_FILT_BSTRIDE + j] = y[i*ystride + j];
    }
  }
  od_filter_dering_orthogonal_8x8_c(y, ystride, in, x, xstride, thresh, dir, tables);
}
