import numpy as np
import math
import csv

# coefficients  a           b           c
# {string: {int: float, int: float, int: float}}
coeffs = {}

with open('mensoutdoor.csv', newline='') as csvfile:
    perfs = list(csv.reader(csvfile))
    
field_events = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon', 'Heptathlon', 'Pentathlon']
thons = ['Decathlon', 'Heptathlon', 'Pentathlon']
    
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

for c in coeffs:
    print(f"'{c}': {coeffs[c]},")

exit()

while True:
    user_input = input("enter event and performance (s or m): ").split()
    event, perf = user_input[0], float(user_input[1])
    a = coeffs[event]['a']
    b = coeffs[event]['b']
    c = coeffs[event]['c']
    if event in field_events:
        print("points: ", math.floor(a*(perf-b)**c))
    else:
        print("points: ", math.floor(a*(b-perf)**c))
    user_input = input('enter event and points: ').split()
    event, p = user_input[0], int(user_input[1])
    a = coeffs[event]['a']
    b = coeffs[event]['b']
    c = coeffs[event]['c']
    if event in thons:
        print("score: ", round(b + (p/a)**(1/c)))
    elif event in field_events:
        print("distance: ", round(b + (p/a)**(1/c), 2))
    else:
        print("time: ", round(b - (p/a)**(1/c), 2))