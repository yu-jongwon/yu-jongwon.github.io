import random

n = 5
a = [i for i in range(n)]
random.shuffle(a)
print(a)

for i in range(n):
  for j in range(n-i-1):
      if a[j] > a[j+1]:
          a[j], a[j+1] = a[j+1], a[j]

print(a)
