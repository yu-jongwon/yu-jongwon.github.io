n = 5

print('\n2-1')
for i in range(n):
  for j in range(n):
    print('*', end='')
  print()

print('\n2-2')
for i in range(n):
  for j in range(i+1):
    print('*', end='')
  print()

print('\n2-3')
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(i+1):
    print('*', end='')
  print()

print('\n2-4')
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  print()

print('\n2-5')
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  print()
for i in range(n-1):
  for j in range(i+1):
    print(' ', end='')
  for j in range(2*(n-i-1)-1):
    print('*', end='')
  print()

print('\n2-6')
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  for j in range(2*(n-i-1)):
    print(' ', end='')
  for j in range((2*i+1)):
    print('*', end='')
  print()
for i in range(n-1):
  for j in range(i+1):
    print(' ', end='')
  for j in range((2*(n-i-1)-1)):
    print('*', end='')
  for j in range(2*(i+1)):
    print(' ', end='')
  for j in range((2*(n-i-1)-1)):
    print('*', end='')
  print()

print('\n2-7')
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  for j in range(2*(n-i-1)):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  for j in range(2*(n-1)):
    print('*', end='')
  for j in range(2*(n-i-1)):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  print()

print('\n2-8')
for i in range(n):
  for j in range(4*n-2-i):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  print()
for i in range(n):
  for j in range(n-i-1):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  for j in range(2*(n-i-1)):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  for j in range(2*n):
    print('*', end='')
  for j in range(2*(n-i-1)):
    print(' ', end='')
  for j in range(2*i+1):
    print('*', end='')
  print()

print('\n2-9')
for i in range(n+2):
  print('$', end='')
print()
for i in range(n):
  print('$', end='')
  for j in range(n):
    print('*', end='')
  print('$')
for i in range(n+2):
  print('$', end='')
print()

print('\n2-10')
print('*\n**')
for i in range(n):
  print('*', end='')
  for j in range(i+1):
    print('@', end='')
  print('*')
for i in range(n-1):
  print('*', end='')
  for j in range(n-i-1):
    print('@', end='')
  print('*')
print('**\n*\n')
