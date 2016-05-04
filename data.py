stats = [[],[],[],[]] # Get from job output
stats = [[band[off::16] for off in range(7)] for band in stats]
from matplotlib import colors, pyplot
import numpy as np
f, ((ax1, ax2), (ax3, ax4)) = pyplot.subplots(2, 2, sharex=True, sharey=True)
ax = [ax1, ax2, ax3, ax4]
xlog = np.log2(range(421,815))
def loglogfit(off, band):
  ylog = np.log2(np.asarray(stats[band][off][421:815], dtype=float))
  coeff = np.polyfit(xlog, ylog, 1)
  fit = np.poly1d(coeff)
  y = np.exp2(fit(xlog))
  label = '%0.3f'%(1.+off/12.)
  ax[band].plot(range(421,815), y, '-', label=label)
  print(band, label, coeff)
for band in range(4):
  for off in range(7):
    loglogfit(off, band)
ax[0].set_xlim([421, 815])
pyplot.legend()
pyplot.show()

