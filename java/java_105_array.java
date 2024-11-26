class Java_105_array {

  static void printArray(int n, int[][] a) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        System.out.printf("%3d", a[i][j]);
      }
      System.out.println();
    }
  }

  public static void main(String[] args) {
    var n = 5;

    System.out.println();
    System.out.println();
    System.out.println("0번 프로그램");
    var k = 1;
    var a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[i][j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("1번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[j][i] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("2번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[n-i-1][j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("3번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[i][n-j-1] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("4번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[n-i-1][n-j-1] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("5번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[n-j-1][n-i-1] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("6번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[n-j-1][i] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("7번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[j][n-i-1] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("8번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[i][i] = k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("9번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-i-1][n-i-1] = k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("10번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[i][n-i-1] = k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("11번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-i-1][i] = k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("12번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[0][i] = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("13번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[0][n-i-1] = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("14번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[i][n-1] = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("15번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-i-1][n-1] = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("16번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-1][i]  = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("17번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-1][n-i-1]  = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("18번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[i][0]  = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("19번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      a[n-i-1][0]  = k;
      k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("20번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n-1; i++) {
      a[0][i] = k++;
    }
    for (var i = 0; i < n-1; i++) {
      a[i][n-1] = k++;
    }
    for (var i = 0; i < n-1; i++) {
      a[n-1][n-i-1] = k++;
    }
    for (var i = 0; i < n-1; i++) {
      a[n-i-1][0] = k++;
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("21번 프로그램");
    k = 1;
    a = new int[n][n];
    a[n/2][n/2] = n*n;
    for (var i = 0; i < n/2; i++) {
      for (var j = 0; j < n-i*2-1; j++) {
        a[i][i+j] = k++;
      }
      for (var j = 0; j < n-i*2-1; j++) {
        a[i+j][n-i-1] = k++;
      }
      for (var j = 0; j < n-i*2-1; j++) {
        a[n-i-1][n-i-j-1] = k++;
      }
      for (var j = 0; j < n-i*2-1; j++) {
        a[n-i-j-1][i] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("22번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[i-j][j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[n-j-1][i+j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("23번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[j][i-j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[i+j][n-j-1] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("24번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[n-i+j-1][j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[j][i+j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("25번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[n-j-1][i-j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[n-1-i-j][n-1-j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("26번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[j][n-i-1+j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[i+j][j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("27번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[i-j][n-1-j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[n-1-j][n-1-i-j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("28번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[n-i-1+j][n-1-j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[j][n-1-i-j] = k++;
      }
    }
    printArray(n, a);

    System.out.println();
    System.out.println();
    System.out.println("29번 프로그램");
    k = 1;
    a = new int[n][n];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i+1; j++) {
        a[n-1-j][n-1-i+j] = k++;
      }
    }
    for (var i = 1; i < n; i++) {
      for (var j = 0; j < n-i; j++) {
        a[n-1-i-j][j] = k++;
      }
    }
    printArray(n, a);
  }
}
