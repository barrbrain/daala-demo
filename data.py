stats = [[],[],[],[]] # Get from job output
stats = [[band[off::16] for off in range(7)] for band in stats]
from matplotlib import colors, pyplot
f, ((ax1, ax2), (ax3, ax4)) = pyplot.subplots(2, 2, sharex=True, sharey=True)
for off in range(7):
  ax1.loglog(range(421,815), stats[0][off][421:815], '-', label='%0.3f'%(1.+off/12.))
for off in range(7):
  ax2.loglog(range(421,815), stats[1][off][421:815], '-', label='%0.3f'%(1.+off/12.))
for off in range(7):
  ax3.loglog(range(421,815), stats[2][off][421:815], '-', label='%0.3f'%(1.+off/12.))
for off in range(7):
  ax4.loglog(range(421,815), stats[3][off][421:815], '-', label='%0.3f'%(1.+off/12.))
ax1.set_xlim([421, 815])
pyplot.legend()
pyplot.show()
