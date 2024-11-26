import random

n = 10
a = [i for i in range(n)]
random.shuffle(a)
print(a)

for i in range(n // 2 - 1, -1, -1):
  # f(i, n)
  p = i
  while True:
    c = p
    l = p * 2 + 1
    r = p * 2 + 2
    if l < n and a[c] < a[l]: c = l
    if r < n and a[c] < a[r]: c = r
    if c == p: break
    a[c], a[p] = a[p], a[c]
    p = c

for i in range(n - 1, 0, -1):
  a[0], a[i] = a[i], a[0]
  # f(0, i)
  p = 0
  while True:
    c = p
    l = p * 2 + 1
    r = p * 2 + 2
    if l < i and a[c] < a[l]: c = l
    if r < i and a[c] < a[r]: c = r
    if c == p: break
    a[c], a[p] = a[p], a[c]
    p = c

print(a)

# def f2(p, size):
#   while True:
#     c = p
#     if p * 2 + 1 < size and a[c] < a[p * 2 + 1]:
#       c = p * 2 + 1
#     if p * 2 + 2 < size and a[c] < a[p * 2 + 2]:
#       c = p * 2 + 2
#     if c == p:
#       break
#     a[c], a[p] = a[p], a[c]
#     p = c

# def f(p, size):
#   c = p
#   if p * 2 + 1 < size and a[c] < a[p * 2 + 1]:
#     c = p * 2 + 1
#   if p * 2 + 2 < size and a[c] < a[p * 2 + 2]:
#     c = p * 2 + 2
#   if c == p: return
#   a[c], a[p] = a[p], a[c]
#   f(c, size)
