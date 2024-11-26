import random

# def partition(a, low, high):
#   i = low
#   for j in range(low, high):
#     if a[j] > a[high]: continue
#     if i != j:
#       a[i], a[j] = a[j], a[i]
#       print(a, "{}[{}] {}[{}] {}".format(a[i], i, a[j], j, a[high]))
#     i += 1
#   a[i], a[high] = a[high], a[i]
#   if low < high:
#     print(a, "> {}[{}] {}[{}]".format(a[i], i, a[high], high))
#   print()
#   return i

# def search(a, low, high, k):
#   # mid = partition(a, low, high)
#   mid = low
#   for j in range(low, high):
#     if a[j] > a[high]: continue
#     a[mid], a[j] = a[j], a[mid]
#     mid += 1
#   a[mid], a[high] = a[high], a[mid]
#   if k < mid: return search(a, low, mid - 1, k)
#   if k > mid: return search(a, mid + 1, high, k)
#   return a[k]

# def search2(a, low, high, k):
#   while True:
#     mid = partition(a, low, high)
#     if k < mid:
#       high = mid - 1
#     elif k > mid:
#       low = mid + 1
#     else:
#       return a[k]

n = 7
a = [random.randrange(30) for _ in range(n)]
random.shuffle(a)
print(a)

k = n - 1
low = 0
high = n - 1
while True:
  i = low
  for j in range(low, high):
    if a[j] > a[high]: continue
    a[i], a[j] = a[j], a[i]
    i += 1
  a[i], a[high] = a[high], a[i]
  if k < i: high = i - 1
  if k > i: low = i + 1
  if k == i: break

print(a[k])
