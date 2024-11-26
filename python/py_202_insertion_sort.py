import random

n = 5
a = [i for i in range(n)]
random.shuffle(a)
print(a)

for i in range(1,n):
  t = a[i]
  j = i
  while j > 0 and t < a[j - 1]:
    a[j] = a[j - 1]
    j -= 1
  a[j] = t

print(a)
