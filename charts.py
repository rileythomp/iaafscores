import matplotlib.pyplot as plt
import numpy as np
import math
import csv

# coefficients  a           b           c
# {string: {int: float, int: float, int: float}}
coeffs = {}

with open('performances.csv', newline='') as csvfile:
    perfs = list(csv.reader(csvfile))
    
field_events = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon', 'Pentathlon', 'Heptathlon']

thons = ['Decathlon', 'Pentathlon', 'Heptathlon']
    
for row in perfs:
    event = row[0]
    if event in field_events:
        d1 = float(row[1])
        d2 = float(row[2])
        d3 = float(row[3])
        b = (d1*d3-d2*d2)/(d1+d3-2*d2)
        c = np.log(2)/(np.log(d1-b)-np.log(d2-b))
        a = 1200/(d1-b)**c
    else:
        t1 = float(row[1])
        t2 = float(row[2])
        t3 = float(row[3])
        b = (t2*t2 - t1*t3)/(2*t2 - t1 - t3)
        c = np.log(2)/(np.log(b-t1) - np.log(b-t2))
        a = 1200/(b-t1)**c
    coeffs[event] = {'a': a, 'b': b, 'c': c}
    
points = [i for i in range(1, 1401)]

event = '100m'

a = coeffs[event]['a']
b = coeffs[event]['b']
c = coeffs[event]['c']

if event in thons:
    y = [round(b + (p/a)**(1/c)) for p in points]
elif event in field_events:
    y = [round(b + (p/a)**(1/c), 2) for p in points]
else:
    y = [round(b - (p/a)**(1/c), 2) for p in points]

world_record = [9.58 for p in points]
plt.plot(points, y)
plt.plot(math.floor(a*(b-9.58)**c), 9.58, 'ro')
plt.text(math.floor(a*(b-9.58)**c) + 10, 9.58 + 0.1, 'WR')
# plt.plot(y, points)
# plt.plot(9.58, math.floor(a*(b-9.58)**c), 'ro')
# plt.text(9.58 + 0.1, math.floor(a*(b-9.58)**c) + 10, 'WR')
plt.title(f'World Athletics {event} Points')
plt.xlabel('Points')
plt.ylabel('Performance')
plt.savefig('chart.png')