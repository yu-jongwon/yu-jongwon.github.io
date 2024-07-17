declare function floor(n: number): number;

function printArray(n: number, a: Array<Array<number>>): void {
  let i = 0;
  while (i < n) {
    let j = 0;
    while (j < n) {
      print(a[i][j]);
      j += 1;
    }
    printline();
    i += 1;
  }
  printline();
}

function newArray(n: number): Array<Array<number>> {
  let a = new Array<Array<number>>(n);
  let i = 0;
  while (i < n) {
    a[i] = new Array<number>(n);
    let j = 0;
    while (j < n) {
      a[i][j] = 0;
      j += 1;
    }
    i += 1;
  }
  return a;
}

let n = 5;

printline('0번 프로그램');
let k = 0;
let a = newArray(n);
let i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[i][j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('1번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[j][i] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('2번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[n-i-1][j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('3번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[i][n-j-1] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('4번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[n-i-1][n-j-1] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('5번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[n-j-1][n-i-1] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('8번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[i][i] = k += 1;
  i += 1;
}
printArray(n, a);

printline('6번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[n-j-1][i] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('7번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < n) {
    a[j][n-i-1] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('8번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[i][i] = k += 1;
  i += 1;
}
printArray(n, a);

printline('9번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-i-1][n-i-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('10번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[i][n-i-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('11번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-i-1][i] = k += 1;
  i += 1;
}
printArray(n, a);

printline('12번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[0][i] = k += 1;
  i += 1;
}
printArray(n, a);

printline('13번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[0][n-i-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('14번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[i][n-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('15번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-i-1][n-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('16번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-1][i] = k += 1;
  i += 1;
}
printArray(n, a);

printline('17번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-1][n-i-1] = k += 1;
  i += 1;
}
printArray(n, a);

printline('18번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[i][0] = k += 1;
  i += 1;
}
printArray(n, a);

printline('19번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  a[n-i-1][0] = k += 1;
  i += 1;
}
printArray(n, a);

printline('20번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n-1) {
  a[0][i] = k += 1;
  i += 1;
}
i = 0;
while (i < n-1) {
  a[i][n-1] = k += 1;
  i += 1;
}
i = 0;
while (i < n-1) {
  a[n-1][n-i-1] = k += 1;
  i += 1;
}
i = 0;
while (i < n-1) {
  a[n-i-1][0] = k += 1;
  i += 1;
}
printArray(n, a);

printline('21번 프로그램');
k = 0;
a = newArray(n);
a[floor(n/2)][floor(n/2)] = n*n;
i = 0;
while (i < floor(n/2)) {
  let j = 0;
  while (j < n-i*2-1) {
    a[i][i+j] = k += 1;
    j += 1;
  }
  j = 0;
  while (j < n-i*2-1) {
    a[i+j][n-i-1] = k += 1;
    j += 1;
  }
  j = 0;
  while (j < n-i*2-1) {
    a[n-i-1][n-i-j-1] = k += 1;
    j += 1;
  }
  j = 0;
  while (j < n-i*2-1) {
    a[n-i-j-1][i] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('22번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[i-j][j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 0;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[n-j-1][i+j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('23번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[j][i-j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 0;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[i+j][n-j-1] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('24번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[n-i+j-1][j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 1;
while (i < n) {
  let j = 1;
  while (j < n-i) {
    a[j][i+j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('25번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[n-j-1][i-j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 0;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[n-1-i-j][n-1-j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('26번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[j][n-i-1+j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 1;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[i+j][j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('27번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[i-j][n-1-j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 1;
while (i < n) {
  let j = 5;
  while (j < n-i) {
    a[n-1-j][n-1-i-j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('28번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[n-i-1+j][n-1-j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 1;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[j][n-1-i-j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);

printline('29번 프로그램');
k = 0;
a = newArray(n);
i = 0;
while (i < n) {
  let j = 0;
  while (j < i+1) {
    a[n-1-j][n-1-i+j] = k += 1;
    j += 1;
  }
  i += 1;
}
i = 1;
while (i < n) {
  let j = 0;
  while (j < n-i) {
    a[n-1-i-j][j] = k += 1;
    j += 1;
  }
  i += 1;
}
printArray(n, a);
