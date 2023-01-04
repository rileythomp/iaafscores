import csv
import numpy as np

# coefficients  a           b           c
# {string: {int: float, int: float, int: float}}
coeffs = {}

field_events = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon', 'Heptathlon', 'Pentathlon']

def time_to_seconds(t):
    time = t.split(':')[::-1]
    secs = 0.0
    placeval = 1
    for part in time:
        secs += placeval*float(part)
        placeval *= 60
    return secs

with open('womensindoor.csv', newline='') as csvfile:
    perfs = list(csv.reader(csvfile))

for i in range(len(perfs[0])):
    event = perfs[0][i]
    if event in field_events:
        p1 = float(perfs[1][i])
        p2 = float(perfs[2][i])
        p3 = float(perfs[3][i])
        b = (p1*p3-p2*p2)/(p1+p3-2*p2)
        c = np.log(2)/(np.log(p1-b)-np.log(p2-b))
        a = 1200/(p1-b)**c
    else:
        p1 = time_to_seconds(perfs[1][i])
        p2 = time_to_seconds(perfs[2][i])
        p3 = time_to_seconds(perfs[3][i])
        b = (p2*p2 - p1*p3)/(2*p2 - p1 - p3)
        c = np.log(2)/(np.log(b-p1) - np.log(b-p2))
        a = 1200/(b-p1)**c
    coeffs[event] = {'a': a, 'b': b, 'c': c}

for c in coeffs:
    print(f"'{c}': {coeffs[c]},")