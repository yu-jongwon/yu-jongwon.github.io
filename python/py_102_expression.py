n = 5

print("00번 프로그램", end=' ')
print([i for i in range(n)])

print("01번 프로그램", end=' ')
print([i+1 for i in range(n)])

print("02번 프로그램", end=' ')
print([i*n for i in range(n)])

print("03번 프로그램", end=' ')
print([i*n+1 for i in range(n)])

print("04번 프로그램", end=' ')
print([(i+1)*n for i in range(n)])

print("05번 프로그램", end=' ')
print([n-i for i in range(n)])

print("06번 프로그램", end=' ')
print([n*(n-i) for i in range(n)])

print("07번 프로그램", end=' ')
print([n-i-1 for i in range(n)])

print("08번 프로그램", end=' ')
print([n*(n-i-1) for i in range(n)])

print("09번 프로그램", end=' ')
print([i*2 for i in range(n)])

print("10번 프로그램", end=' ')
print([i*2+1 for i in range(n)])

print("11번 프로그램", end=' ')
print([(i+1)*2 for i in range(n)])

print("12번 프로그램", end=' ')
print([n*2-i*2 for i in range(n)])

print("13번 프로그램", end=' ')
print([(n-1)*2-i*2 for i in range(n)])

print("14번 프로그램", end=' ')
print([i%2 for i in range(n)])

print("15번 프로그램", end=' ')
print([(i+1)%2 for i in range(n)])

print("16번 프로그램", end=' ')
print([i/2 for i in range(n+1)])

print("17번 프로그램", end=' ')
print([i/2%2 for i in range(n+1)])

print("18번 프로그램", end=' ')
print([i == 2 for i in range(n)])

print("19번 프로그램", end=' ')
print([i != 2 for i in range(n)])

print("20번 프로그램", end=' ')
print([i < 2 for i in range(n)])

print("21번 프로그램", end=' ')
print([i > 2 for i in range(n)])

print("22번 프로그램", end=' ')
print([i <= 2 for i in range(n)])

print("23번 프로그램", end=' ')
print([i >= 2 for i in range(n)])
