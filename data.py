import json
from matplotlib import colors, pyplot
import numpy as np
import sys
from scipy.interpolate import interp1d
from scipy.interpolate import UnivariateSpline
stats = json.loads(open(sys.argv[1], 'r').read())
stats = [[band[off::16] for off in range(7)] for band in stats]
f, ((ax1, ax2, ax3), (ax4, ax5, ax6), (ax7, ax8, ax9)) = pyplot.subplots(3, 3, sharex=True, sharey=True)
ax = [ax1, ax2, ax3, ax4, ax5, ax6, ax7, ax8, ax9]
coeffs = {}
def loglogfit(off, band):
  y = np.asarray(stats[band][off], dtype=float)
  x = y.nonzero()[0]
  if (x.size == 0): return
  xlog = np.log2(x)
  ylog = np.log2(y[x])
  label = '%0.3f'%(1.+off/12.)
  inverse = interp1d(ylog, xlog)
  # coeffs[(band, label+'i')] = inverse
  x = np.arange(24,492)
  b1 = np.log2(np.asarray(stats[band][0], dtype=float)[x])
  qm = inverse(b1)-np.log2(x)
  ax[band].plot(x, np.exp2(qm)*16, '-', label=label)
  ax[band].grid(True, which='both')
  print(band, band - band//3, label, np.exp2(qm.mean())*16)
for band in range(len(stats)):
  for off in range(1,7):
    loglogfit(off, band)
  #bitrate = min(np.log2(stats[band][i][9]) for i in range(7))
  #print(max(np.exp2(coeffs[(band, '%0.3fi'%(1.+i/12.))](bitrate)) for i in range(7)))
  #bitrate = max(np.log2(stats[band][i][1015]) for i in range(7))
  #print(min(np.exp2(coeffs[(band, '%0.3fi'%(1.+i/12.))](bitrate)) for i in range(7)))
ax[0].set_xlim([24, 492])
pyplot.legend()
pyplot.show()

