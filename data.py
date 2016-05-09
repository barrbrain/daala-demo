import json
from matplotlib import colors, pyplot
import numpy as np
from operator import add
import sys
from scipy.integrate import trapz
from scipy.interpolate import interp1d
from scipy import optimize
stats = json.loads(open(sys.argv[1], 'r').read())
stats = [[band[off::16] for off in range(7)] for band in stats]
f, ((ax1, ax2), (ax4, ax5), (ax7, ax8), (ax9, ax10)) = pyplot.subplots(4, 2, sharex=True, sharey=True)
ax = [ax1, ax2, None, ax4, ax5, None, ax7, ax8, ax9, ax10]
coeffs = {}
np.seterr(divide='ignore')
def Q16(x):
  return np.exp2(x)*16.
def iQ16(x):
  return np.log2(x)-4.
y_min, y_max = 16, 16
def loglogfit(off, band):
  global y_min
  global y_max
  if band > 0 and (band-band//3)==(band-1-(band-1)//3):
    y1log = np.log2(np.asarray(list(map(add, stats[band-1][0], stats[band][0])), dtype=float))
    y = np.asarray(list(map(add, stats[band-1][off], stats[band][off])), dtype=float)
  elif band < 8 and (band-band//3)==(band+1-(band+1)//3):
    return
  else:
    y1log = np.log2(np.asarray(stats[band][0], dtype=float))
    y = np.asarray(stats[band][off], dtype=float)
  x = y.nonzero()[0]
  if (x.size == 0): return
  xlog = np.log2(x)
  ylog = np.log2(y[x])
  label = '%0.3f'%(1.+off/12.)
  inverse = interp1d(ylog, xlog)
  b1 = y1log[x]
  x = x[np.all((x >= 9, b1 < ylog.max(), b1 > ylog.min()), axis=0)]
  xlog = np.log2(x)
  b1 = y1log[x]
  qm = inverse(b1)-xlog
  ax[band].loglog(x, Q16(qm), '-', label=label)
  y_min = min(y_min, Q16(qm.min()))
  y_max = max(y_max, Q16(qm.max()))
  ax[band].grid(True, which='both')
  def piecewise_linear(x, y0, y1):
    x0 = np.log2(4 * 16)
    x1 = np.log2(318 * 16)
    return np.piecewise(x, [x <= x0], [y0, lambda x:(x-x0)*(y1-y0)/(x1-x0)+y0])
  area = trapz(qm[x <= 64], xlog[x <= 64])
  mean = area / (xlog[x<=64].max() - xlog[x<=64].min())
  fit = np.polyval(np.polyfit(xlog[x >= 64], qm[x >= 64], 1), np.log2(318*16))
  opt = optimize.curve_fit(piecewise_linear, xlog, qm, [mean, fit])
  y0 = np.floor(Q16(opt[0][0]))
  y1 = np.floor(Q16(opt[0][1]))
  best_sse = 1000000
  best = []
  for y0__ in range(0, 2):
    for y1__ in range(0, 2):
      y0_, y1_ = iQ16(y0+y0__), iQ16(y1+y1__)
      sse = trapz((qm - iQ16(np.round(Q16(piecewise_linear(xlog, y0_, y1_)))))**2, xlog)
      if sse < best_sse:
        best, best_sse = [y0_, y1_], sse
  y0, y1 = best
  print(band, band - band//3, label, Q16(y0), Q16(y1))
  if off == 6:
    ax[band].loglog(x, np.round(Q16(piecewise_linear(xlog, y0, y1))), '-', label='Fit')
for band in range(len(stats)):
  for off in range(1,7):
    loglogfit(off, band)
for band in range(len(stats), 10):
  if not ax[band]: continue
  for off in range(1,7):
    label = '%0.3f'%(1.+off/12.)
    ax[band].plot([],[],'-',label=label)
  ax[band].plot([],[],'-',label='Fit')
y_min, y_max = int(np.floor(y_min)), int(np.ceil(y_max))
ax[0].set_ylim([y_min - 0.5, y_max + 0.5])
ax[0].set_yticks(range(y_min, y_max+1))
ax[0].set_yticklabels(list(map(str,range(y_min, y_max+1))))
ax[0].set_xlim([9, 1015])
[tick.label.set_fontsize(6) for ax0 in ax if ax0 for tick in ax0.yaxis.get_major_ticks()]
pyplot.legend(ncol=8, fontsize='x-small', loc='lower center')
pyplot.show()

