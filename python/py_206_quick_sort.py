import random

def partition(a, low, high):
  i = low
  for j in range(low, high):
    if a[j] > a[high]: continue
    if i != j:
      a[i], a[j] = a[j], a[i]
      # print(a, "{}[{}] {}[{}] {}".format(a[i], i, a[j], j, a[high]))
    i += 1
  a[i], a[high] = a[high], a[i]
  # if i != high:
  #   print(a, "> {}[{}] {}[{}]".format(a[i], i, a[high], high))
  # print()
  return i

def devide(a, low, high):
  if low >= high: return
  mid = partition(a, low, high)
  devide(a, low, mid-1)
  devide(a, mid+1, high)

n = 7
a = [i for i in range(n)]
random.shuffle(a)
print(a)
devide(a, 0, n - 1)
print(a)
