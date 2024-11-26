n = 5

print('\n1-1)')
for i in range(n):
  for j in range(n):
    print(f'{i*n+j+1:3}', end='')
  print()

print('\n1-2)')
for i in range(n):
  for j in range(n):
    print(f'{n*n-(i+1)*n+j+1:3}', end='')
  print()

print('\n1-3)')
for i in range(n):
  for j in range(n):
    print(f'{(i*n+j)*2+1:3}', end='')
  print()

print('\n1-4)')
for i in range(n):
  for j in range(i+1):
    print(f'{j+1:3}', end='')
  print()

print('\n1-5)')
for i in range(n):
  for j in range(i+1):
    print(f'{(i+1)*(i+2)//2-i+j:3}', end='')
  print()

print('\n1-6)')
for i in range(n):
  for j in range(n-i):
    print(f'{j+1:3}', end='')
  print()

print('\n1-7)')
for i in range(n):
  for j in range(n-i):
    print(f'{i*n+j+1-((i*(i-1))//2):3}', end='')
  print()

print('\n1-8)')
for i in range(n):
  for j in range(n):
    print(f'{i+j+1:3}', end='')
  print()

print('\n1-9)')
for i in range(n):
  for j in range(n):
    print(f'{(i+j)%n+1:3}', end='')
  print()

print('\n1-10)')
for i in range(n):
  for j in range(n-i-1):
    print(f'{"":3}', end='')
  for j in range(i+1):
    print(f'{(i+1)*(i+2)//2-i+j:3}', end='')
  print()
