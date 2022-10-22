import numpy as np
import math
import csv

# coefficients  a           b           c
# {string: {int: float, int: float, int: float}}
coeffs = {}

with open('times.csv', newline='') as csvfile:
    times = list(csv.reader(csvfile))
    
for row in times:
    race = row[0]
    t1 = float(row[1])
    t2 = float(row[2])
    t3 = float(row[3])
    b = (t2*t2 - t1*t3)/(2*t2 - t1 - t3)
    c = np.log(2)/(np.log(b-t1) - np.log(b-t2))
    a = 1200/(b-t1)**c
    coeffs[race] = {'a': a, 'b': b, 'c': c}

print(coeffs)

while True:
    user_input = input("enter event and time: ").split()
    race, t = user_input[0], float(user_input[1])
    a = coeffs[race]['a']
    b = coeffs[race]['b']
    c = coeffs[race]['c']
    print("points: ", math.floor(a*(b-t)**c))
    user_input = input("enter event and points: ").split()
    race, p = user_input[0], int(user_input[1])
    print("time: ", round(b - (p/a)**(1/c), 2))