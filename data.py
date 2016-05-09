import json
from matplotlib import colors, pyplot
import numpy as np
import sys
from scipy.integrate import trapz
from scipy.interpolate import interp1d
from scipy import optimize
stats = json.loads(open(sys.argv[1], 'r').read())
stats = [[band[off::16] for off in range(7)] for band in stats]
f, ((ax1, ax2, ax3), (ax4, ax5, ax6), (ax7, ax8, ax9)) = pyplot.subplots(3, 3, sharex=True, sharey=True)
ax = [ax1, ax2, ax3, ax4, ax5, ax6, ax7, ax8, ax9]
coeffs = {}
def Q16(x):
  return np.exp2(x)*16
def loglogfit(off, band):
  y = np.asarray(stats[band][off], dtype=float)
  x = y.nonzero()[0]
  if (x.size == 0): return
  xlog = np.log2(x)
  ylog = np.log2(y[x])
  label = '%0.3f'%(1.+off/12.)
  inverse = interp1d(ylog, xlog)
  # coeffs[(band, label+'i')] = inverse
  y1log = np.log2(np.asarray(stats[band][0], dtype=float))
  b1 = y1log[x]
  x = x[np.all((x >= 9, b1 < ylog.max(), b1 > ylog.min()), axis=0)]
  xlog = np.log2(x)
  b1 = y1log[x]
  qm = inverse(b1)-xlog
  ax[band].loglog(x, Q16(qm), '-', label=label)
  ax[band].grid(True, which='both')
  def piecewise_linear(x, y0, y1):
    x0 = np.log2(4 * 16)
    x1 = np.log2(318 * 16)
    return np.piecewise(x, [x <= x0], [y0, lambda x:(x-x0)*(y1-y0)/(x1-x0)+y0])
  area = trapz(qm[x <= 64], xlog[x <= 64])
  mean = area / (xlog[x<=64].max() - xlog[x<=64].min())
  #mean = np.polyval(np.polyfit(xlog[x >= 64], qm[x >= 64], 1), np.log2(4*16))
  fit = np.polyval(np.polyfit(xlog[x >= 64], qm[x >= 64], 1), np.log2(318*16))
  opt = optimize.curve_fit(piecewise_linear, xlog, qm, [mean, fit])
  y0 = np.floor(Q16(opt[0][0]))
  y1 = np.floor(Q16(opt[0][1]))
  best_sse = 1000000
  best = []
  for y0__ in range(0, 2):
    for y1__ in range(0, 2):
      y0_, y1_ = np.log2((y0+y0__)/16.), np.log2((y1+y1__)/16.)
      sse = trapz((qm - np.log2(np.round(Q16(piecewise_linear(xlog, y0_, y1_)))/16.))**2, xlog)
      if sse < best_sse:
        best, best_sse = [y0_, y1_], sse
  y0, y1 = best
  print(band, band - band//3, label, Q16(y0), Q16(y1))
  if off == 6:
    ax[band].loglog(x, np.round(Q16(piecewise_linear(xlog, y0, y1))), '-', label='Fit')
for band in range(len(stats)):
  for off in range(1,7):
    loglogfit(off, band)
  #bitrate = min(np.log2(stats[band][i][9]) for i in range(7))
  #print(max(np.exp2(coeffs[(band, '%0.3fi'%(1.+i/12.))](bitrate)) for i in range(7)))
  #bitrate = max(np.log2(stats[band][i][1015]) for i in range(7))
  #print(min(np.exp2(coeffs[(band, '%0.3fi'%(1.+i/12.))](bitrate)) for i in range(7)))
for band in range(len(stats), 9):
  for off in range(1,7):
    label = '%0.3f'%(1.+off/12.)
    ax[band].plot([],[],'-',label=label)
  ax[band].plot([],[],'-',label='Fit')
ax[0].set_ylim([7, 46])
ax[0].set_yticks(range(8, 45))
ax[0].set_xlim([9, 1015])
pyplot.legend()
pyplot.show()

