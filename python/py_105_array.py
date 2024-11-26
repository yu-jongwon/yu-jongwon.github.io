n = 5

def printArray(n, a):
  for i in range(n):
    for j in range(n):
      print(f'{a[i][j]:3}', end='')
    print()

print('\n3-1')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    a[i][j] = k
    k += 1
printArray(n, a)

print('\n3-2')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    a[j][i] = k
    k += 1
printArray(n, a)

print('\n3-3')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n-1, -1, -1):
  for j in range(n):
    a[i][j] = k
    k += 1
printArray(n, a)

print('\n3-4')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    if i%2 == 0:
      a[i][j] = k
      k += 1
    else:
      a[i][n-j-1] = k
      k += 1
printArray(n, a)

print('\n3-5')
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  a[0][i] = 1
  a[i][0] = 1
  a[n-1][n-i-1] = 1
  a[n-i-1][n-1] = 1
  a[i][i] = 1
  a[n-i-1][i] = 1
printArray(n, a)

print('\n3-6')
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    a[i][j] = (i+j+1)%2
printArray(n, a)

print('\n3-7')
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    a[i][j] = (i//2+j//2+1)%2
printArray(n, a)

print('\n3-8')
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(n):
    a[i][j] = (i//3+j//3+1)%2
printArray(n, a)

print('\n3-9')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n-1):
  a[0][i] = k
  k += 1
for i in range(n-1):
  a[i][n-1] = k
  k += 1
for i in range(n-1):
  a[n-1][n-i-1] = k
  k += 1
for i in range(n-1):
  a[n-i-1][0] = k
  k += 1
printArray(n, a)

print('\n3-10')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
a[n//2][n//2] = n*n
for i in range(n//2):
  for j in range(n-i*2-1):
    a[i][i+j] = k
    k += 1
  for j in range(n-i*2-1):
    a[i+j][n-i-1] = k
    k += 1
  for j in range(n-i*2-1):
    a[n-i-1][n-i-j-1] = k
    k += 1
  for j in range(n-i*2-1):
    a[n-i-j-1][i] = k
    k += 1
printArray(n, a)

print('\n3-11')
a = [[0 for _ in range(n)] for _ in range(n)]
a[n//2][n//2] = 1
for i in range(n//2):
  for j in range(n-i*2):
    k = n//2-i+1
    a[i][j+i] = k
    a[n-i-1][i+j] = k
    a[i+j][i] = k
    a[i+j][n-i-1] = k
printArray(n, a)

print('\n3-12')
k = 1
a = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n):
  for j in range(i+1):
    a[i-j][j] = k
    k += 1
for i in range(1, n):
  for j in range(n-i):
    a[n-j-1][i+j] = k
    k += 1
printArray(n, a)

print('\n3-12-2')
# k = 1
# a = [[0 for _ in range(n)] for _ in range(n)]
# for i in range(n*2-1):
#   # print('%3d %3d %3d %3d\n', i, i-i/n*i%n-i/n, i/n*(i%n+1), i-i/n*i%n-i/n-i/n*(i%n+1))
#   for (j = 0 j < i-i/n*i%n-i/n-i/n*(i%n+1)+1 j++) {
#     a[i-i/n*i%n-i/n-j][i/n*(i%n+1)+j] = k++
# printArray(n, a)
