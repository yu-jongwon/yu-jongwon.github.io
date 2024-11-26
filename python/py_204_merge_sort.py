import random

def sort(a, low, high):
  if low >= high: return

  mid = (low + high) // 2
  sort(a, low, mid)
  sort(a, mid + 1, high)

  t = [0 for _ in range(high - low + 1)]
  i = low
  j = mid + 1
  k = 0
  while i <= mid and j <= high:
    if a[i] < a[j]:
      t[k] = a[i]
      i += 1
      k += 1
    else:
      t[k] = a[j]
      j += 1
      k += 1
  while i <= mid:
    t[k] = a[i]
    i += 1
    k += 1
  while j <= high:
    t[k] = a[j]
    j += 1
    k += 1
  for i in range(k):
    a[low + i] = t[i]

n = 10
a = [i for i in range(n)]
random.shuffle(a)
print(a)
sort(a, 0, n - 1)
print(a)
