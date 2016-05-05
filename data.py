import json
from matplotlib import colors, pyplot
import numpy as np
import sys
stats = json.loads(open(sys.argv[1], 'r').read())
stats = [[band[off::16] for off in range(12,19)] for band in stats]
f, ((ax1, ax2, ax3), (ax4, ax5, ax6), (ax7, ax8, ax9)) = pyplot.subplots(3, 3, sharex=True, sharey=True)
ax = [ax1, ax2, ax3, ax4, ax5, ax6, ax7, ax8, ax9]
coeffs = {}
def loglogfit(off, band):
  y = np.asarray(stats[band][off], dtype=float)
  x = y.nonzero()[0]
  if (x.size == 0): return
  xlog = np.log2(x)
  ylog = np.log2(y[x])
  coeff = np.polyfit(xlog, ylog, 1)
  fit = np.poly1d(coeff)
  y = np.exp2(fit(xlog))
  label = '%0.3f'%(1.+off/12.)
  ax[band].loglog(x, y, '-', label=label)
  ax[band].grid(True, which='both')
  coeffs[(band, label)] = coeff
  print(band, label, coeff, x.size)
for band in range(len(stats)):
  for off in range(7):
    loglogfit(off, band)
  b1 = coeffs[(band, '1.000')]
  b1_5 = coeffs[(band, '1.500')]
  qm_421 = np.exp2((np.log2(421)*b1[0]+b1[1]-b1_5[1])/b1_5[0])*16/421
  qm_814 = np.exp2((np.log2(814)*b1[0]+b1[1]-b1_5[1])/b1_5[0])*16/814
  print(np.sqrt(qm_421*qm_814))
ax[0].set_xlim([421, 814])
pyplot.legend()
pyplot.show()

