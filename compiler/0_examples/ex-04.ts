// recursive calls
function f01(n: number): void {
  if (n == 0) { return; }
  printline('Hello, World!');
  f01(n-1);
}

function f02(n: number): number {
  if (n < 2) { return n; }
  return n * f02(n-1);
}

function f03(a: number, n: number): number {
  if (n < 1) { return 1; }
  return a * f03(a, n-1);
}

function f04_01(n: number): number {
  if (n < 2) { return n; }
  return f04_01(n-1) + f04_01(n-2);
}

function f04_02(n: number): number {
  function f(n: number, a: Array<number>): number {
    if (n < 2) { return n; }
    if (a[n] != 0) { return a[n]; }
    return a[n] = f(n-1, a) + f(n-2, a);
  }

  let a = new Array<number>(n+1);
  let i = 0;
  while (i < n + 1) {
    a[i] = 0;
    i += 1;
  }
  return f(n, a);
}

function f04_03(n: number): number {
  let a = 0;
  let b = 1;
  let i = 0;
  while (i < n) {
    let t = a;
    a = b;
    b = t + b;
    i += 1;
  }
  return a;
}

function f04_04(n: number): number {
  let a = new Array<number>(n);
  a[0] = 0;
  a[1] = 1;
  let i = 2;
  while (i < n) {
    a[i] = a[i-1] + a[i-2];
    i += 1;
  }
  return a[n-1] + a[n-2];
}

function f05(a: number, b: number): number {
  if (b == 0) { return a; }
  return f05(b, a % b);
}

function f06_01(): void {
  let result = new Array<number>(3);
  let i = 0;
  while (i < 3) {
    result[0] = i;
    let j = 0;
    while (j < 3) {
      result[1] = j;
      let k = 0;
      while (k < 3) {
        result[2] = k;
        let l = 0;
        while (l < 3) {
          print(result[l]);
          l += 1;
        }
        printline();
        k += 1;
      }
      j += 1;
    }
    i += 1;
  }
}

function f06_02(n: number, result: Array<number>, k: number): void {
  if (k == n) {
    let i = 0;
    while (i < n) {
      print(result[i]);
      i += 1;
    }
    printline();
    return;
  }
  let i = 0;
  while (i < n) {
    result[k] = i;
    f06_02(n, result, k+1);
    i += 1;
  }
}

function f07_01(): void {
  let result = new Array<number>(3);
  let i = 0;
  while (i < 3) {
    result[0] = i;
    let j = i;
    while (j < 3) {
      result[1] = j;
      let k = j;
      while (k < 3) {
        result[2] = k;
        let l = 0;
        while (l < 3) {
          print(result[l]);
          l += 1;
        }
        printline();
        k += 1;
      }
      j += 1;
    }
    i += 1;
  }
}

function f07_02(n: number, result: Array<number>, i: number, k: number): void {
  if (k == n) {
    let j = 0;
    while (j < n) {
      print(result[j]);
      j += 1;
    }
    printline();
    return;
  }
  let j = i;
  while (j < n) {
    result[k] = j;
    f07_02(n, result, j, k+1);
    j += 1;
  }
}

function f08_01(): void {
  let result = new Array<number>(3);
  let i = 0;
  while (i < 5) {
    result[0] = i;
    let j = i + 1;
    while (j < 5) {
      result[1] = j;
      let k = j + 1;
      while (k < 5) {
        result[2] = k;
        let l = 0;
        while (l < 3) {
          print(result[l]);
          l += 1;
        }
        printline();
        k += 1;
      }
      j += 1;
    }
    i += 1;
  }
}

function f08_02(n: number, m: number, result: Array<number>, i: number, k: number): void {
  if (k == n) {
    let j = 0;
    while (j < n) {
      print(result[j]);
      j += 1;
    }
    printline();
    return;
  }
  let j = i;
  while (j < m) {
    result[k] = j;
    f08_02(n, m, result, j+1, k+1);
    j += 1;
  }
}

function f09_01(): void {
  let result = new Array<number>(3);
  let used = new Array<boolean>(3);
  let i = 0;
  while (i < 3) {
    if (used[i]) {
      i += 1;
      continue;
    }
    used[i] = true;
    result[0] = i;
    let j = 0;
    while (j < 3) {
      if (used[j]) {
        j += 1;
        continue;
      }
      used[j] = true;
      result[1] = j;
      let k = 0;
      while (k < 3) {
        if (used[k]) {
          k += 1;
          continue;
        }
        used[k] = true;
        result[2] = k;
        let l = 0;
        while (l < 3) {
          print(result[l]);
          l += 1;
        }
        printline();
        used[k] = false;
        k += 1;
      }
      used[j] = false;
      j += 1;
    }
    used[i] = false;
    i += 1;
  }
}

function f09_02(n: number, visited: Array<boolean>, result: Array<number>, k: number): void {
  if (k == n) {
    let i = 0;
    while (i < n) {
      print(result[i]);
      i += 1;
    }
    printline();
    return;
  }
  let i = 0;
  while (i < n) {
    if (visited[i]) {
      i += 1;
      continue;
    }
    visited[i] = true;
    result[k] = i;
    f09_02(n, visited, result, k+1);
    visited[i] = false;
    i += 1;
  }
}

function f10(n: number, from: string, middle: string, to: string): number {
  if (n == 1) {
    printline('Move', n, 'from', from, 'to', to);
    return 1;
  }
  let c = 1;
  c += f10(n-1, from, to, middle);
  printline('Move', n, 'from', from, 'to', to);
  c += f10(n-1, middle, from, to);
  return c;
}

printline('1번 프로그램 - 재귀함수');
f01(5);
printline();

printline('2번 프로그램 - 팩토리얼 ', f02(7));
printline('3번 프로그램 - a의 n승 ', f03(2, 5));

//0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
let n = 10;
printline('4번 프로그램 - 피보나치 수열 1', f04_01(n));
printline('4번 프로그램 - 피보나치 수열 2', f04_02(n));
printline('4번 프로그램 - 피보나치 수열 3', f04_03(n));
printline('4번 프로그램 - 피보나치 수열 4', f04_04(n));

printline('5번 프로그램 - 최대 공약수', f05(15, 12));

n = 3;
printline('6번 프로그램 - 중복 순열 1');
f06_01();
printline();

printline('6번 프로그램 - 중복 순열 2');
f06_02(n, new Array<number>(n), 0);
printline();

printline('7번 프로그램 - 중복 조합 1');
f07_01();
printline();

printline('7번 프로그램 - 중복 조합 2');
f07_02(n, new Array<number>(n), 0, 0);
printline();

printline('8번 프로그램 - 조합 1');
f08_01();
printline();

printline('8번 프로그램 - 조합 2');
f08_02(n, 5, new Array<number>(n), 0, 0);
printline();

printline('9번 프로그램 - 순열 1');
f09_01();
printline();

printline('9번 프로그램 - 순열 2');
f09_02(n, new Array<boolean>(n), new Array<number>(n), 0);
printline();

printline('10번 프로그램 - 하노이탑');
let c = f10(n, 'A', 'B', 'C');
printline('Moved', c, 'times');
