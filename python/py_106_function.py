def f00():
  print('Hello, World!')
  f00()

def f01(n):
  if n == 0: return
  print('Hello, World!')
  f01(n-1)

def f02(n):
    if n < 2: return n
    return n * f02(n-1)

def f03(a, n):
  if n < 1: return 1
  return a * f03(a, n-1)

def f04_01(n):
    if n < 2: return n
    return f04_01(n-1) + f04_01(n-2)

def f04_2(n, a):
  if n < 2: return n
  if a[n] != 0: return a[n]
  a[n] = f04_2(n-1, a) + f04_2(n-2, a)
  return a[n]

def f04_3(n):
  a = 0
  b = 1
  for _ in range(n):
    a, b = b, a + b
  return a

def f04_4(n):
  a = [0 for _ in range(n + 1)]
  a[0] = 0
  a[1] = 1
  for i in range(2, n):
    a[i] = a[i-1] + a[i-2]
  return a[n-1] + a[n-2]

def f05(a ,b):
  print(a, b)
  if b == 0: return a
  return f05(b, a % b)

def f06(n, result, k):
  if k == n:
    print(result)
    return
  for i in range(n):
    result[k] = i
    f06(n, result, k+1)

def f07(n, result, i, k):
  if k == n:
    print(result)
    return
  for j in range(i, n):
    result[k] = j
    f07(n, result, j, k+1)

def f08(n, m, result, i, k):
  if k == n:
    print(result)
    return
  for j in range(i, m):
    result[k] = j
    f08(n, m, result, j+1, k+1)

def f09(n, visited, result, k):
  if k == n:
    print(result)
    return
  for i in range(n):
    if visited[i]: continue
    visited[i] = True
    result[k] = i
    f09(n, visited, result, k+1)
    visited[i] = False

def f10(n, _from, middle, to):
  if n == 1:
    print("Move {:d} from {:s} to {:s}".format(n, _from, to))
    return 1

  c = 1
  c += f10(n-1, _from, to, middle)
  print("Move {:d} from {:s} to {:s}".format(n, _from, to))
  c += f10(n-1, middle, _from, to)
  return c

print("2번 프로그램 - 팩토리얼")
print(f02(7))
print()

print("3번 프로그램 - a의 n승")
print(f03(2, 5))
print()

n = 35
print("4번 프로그램 - 피보나치 수열 1")
print(f04_01(n))
print()

print("4번 프로그램 - 피보나치 수열 2")
print(f04_2(n, [0 for _ in range(n + 1)]))
print()

print("4번 프로그램 - 피보나치 수열 3")
print(f04_3(n))
print()

print("4번 프로그램 - 피보나치 수열 4")
print(f04_4(n))
print()

print("5번 프로그램 - 최대 공약수")
print(f05(60, 48))
print()

print("6번 프로그램 - 조합")
n = 3
f06(n, 5, [0 for _ in range(n)], 0, 0)
print()

print("7번 프로그램 - 중복 순열")
n = 2
f07(n, [0 for _ in range(n)], 0)
print()

print("8번 프로그램 - 중복 조합")
n = 3
f08(n, [0 for _ in range(n)], 0, 0)
print()

print("9번 프로그램 - 순열")
n = 3
f09(n, [0 for _ in range(n)], [0 for _ in range(n)], 0)
print()

print("10번 프로그램 - 하노이탑")
n = 3
c = f(n, 'A', 'B', 'C')
print(f'Moved {c} times')
