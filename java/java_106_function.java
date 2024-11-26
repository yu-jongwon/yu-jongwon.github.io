class Java_106_function {
  static void f00() {
    System.out.println("Hello, World!");
    f00();
  }

  static void f01(int n) {
    if (n == 0) return;
    System.out.println("Hello, World!");
    f01(n-1);
  }

  static int f02(int n) {
    if (n < 2) return n;
    return n * f02(n-1);
  }

  static int f03(int a, int n) {
    if (n < 1) return 1;
    return a * f03(a, n-1);
  }

  static int f04_01(int n) {
    if (n < 2) return n;
    return f04_01(n-1) + f04_01(n-2);
  }

  static int[] nums = new int[100];
  static int f04_2(int n) {
    if (n < 2) return n;
    if (nums[n] != 0) return nums[n];
    return nums[n] = f04_2(n-1) + f04_2(n-2);
  }

  static int f04_3(int n) {
    var a = 0;
    var b = 1;
    for (var i = 0; i < n; i++) {
      var t = a;
      a = b;
      b = t + b;
    }
    return a;
  }

  static int f04_4(int n) {
    var a = new int[n];
    a[0] = 0;
    a[1] = 1;
    for (int i = 2; i < n; i++) {
      a[i] = a[i-1] + a[i-2];
    }
    return a[n-1] + a[n-2];
  }

  static int f05(int a, int b) {
    if (b == 0) return a;
    return f05(b, a % b);
  }

  static void f06(int n, int[] result, int k) {
    if (k == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    for (var i = 0; i < n; i++) {
      result[k] = i;
      f06(n, result, k+1);
    }
  }

  static void f07(int n, int[] result, int i, int k) {
    if (k == n) {
      for (var j = 0; j < n; j++) {
        System.out.printf("%3d", result[j]);
      }
      System.out.println();
      return;
    }
    for (int j = i; j < n; j++) {
      result[k] = j;
      f07(n, result, j, k+1);
    }
  }

  static void f08(int n, int m, int[] result, int i, int k) {
    if (k == n) {
      for (var j = 0; j < n; j++) {
        System.out.printf("%3d", result[j]);
      }
      System.out.println();
      return;
    }
    for (int j = i; j < m; j++) {
      result[k] = j;
      f08(n, m, result, j+1, k+1);
    }
  }

  static void f09(int n, boolean[] visited, int[] result, int k) {
    if (k == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    for (var i = 0; i < n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      result[k] = i;
      f09(n, visited, result, k+1);
      visited[i] = false;
    }
  }

  static int f10(int n, char from, char middle, char to) {
    if (n == 1) {
      System.out.printf("Move %d from %c to %c\n", n, from, to);
      return 1;
    }
    var c = 1;
    c += f10(n-1, from, to, middle);
    System.out.printf("Move %d from %c to %c\n", n, from, to);
    c += f10(n-1, middle, from, to);
    return c;
  }

  public static void main(String[] args) {
    System.out.println("2번 프로그램 - 팩토리얼");
    System.out.println(f02(7));
    System.out.println();

    System.out.println("3번 프로그램 - a의 n승");
    System.out.println(f03(2, 5));
    System.out.println();

    var n = 35;
    System.out.println("4번 프로그램 - 피보나치 수열 1");
    System.out.println(f04_01(n));
    System.out.println();

    System.out.println("4번 프로그램 - 피보나치 수열 2");
    System.out.println(f04_2(n));
    System.out.println();

    System.out.println("4번 프로그램 - 피보나치 수열 3");
    System.out.println(f04_3(n));
    System.out.println();

    System.out.println("4번 프로그램 - 피보나치 수열 4");
    System.out.println(f04_4(n));
    System.out.println();

    System.out.println("5번 프로그램 - 최대 공약수");
    System.out.println(f05(15, 12));
    System.out.println();

    System.out.println("6번 프로그램 - 중복 순열");
    n = 2;
    f06(n, new int[n], 0);
    System.out.println();

    System.out.println("7번 프로그램 - 중복 조합");
    n = 3;
    f07(n, new int[n], 0, 0);
    System.out.println();

    System.out.println("8번 프로그램 - 조합");
    n = 3;
    f08(n, 5, new int[n], 0, 0);
    System.out.println();

    System.out.println("9번 프로그램 - 순열");
    n = 3;
    f09(n, new boolean[n], new int[n], 0);
    System.out.println();

    System.out.println("10번 프로그램 - 하노이탑");
    n = 3;
    var c = f10(n, 'A', 'B', 'C');
    System.out.printf("Moved %d times\n", c);
  }
}
