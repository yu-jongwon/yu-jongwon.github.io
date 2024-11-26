import random

n = 5
a = [i for i in range(n)]
random.shuffle(a)
print(a)

for i in range(n):
  j = 0
  for k in range(n-i):
    if a[j] < a[k]:
        j = k
  a[n-i-1], a[j] = a[j], a[n-i-1]

print(a)
