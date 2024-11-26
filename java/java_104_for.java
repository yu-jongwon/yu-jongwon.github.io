class Java_104_for {
  public static void main(String[] args) {
    int n = 5;

    System.out.println();
    System.out.println();
    System.out.println("0번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("1번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("2번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("3번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n-1; i++) {
      for (int j = 0; j < n-i-1; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("4번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n-i; j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 1; i < n; i++) {
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("5번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("6번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < i; j++)
        System.out.print(" ");
      for (int j = 0; j < n - i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("7번 프로그램");
    for (int i = 0; i < n-1; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < i; j++)
        System.out.print(" ");
      for (int j = 0; j < n - i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("8번 프로그램");
    for (int i = 0; i < n-1; i++) {
      for (int j = 0; j < i; j++)
        System.out.print(" ");
      for (int j = 0; j < n - i; j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("9번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j < (2 * i + 1); j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("10번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < i; j++)
        System.out.print(" ");
      for (int j = 0; j < 2 * (n-i)-1; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("11번 프로그램");
    for (int i = 0; i < n-1; i++) {
      for (int j = 0; j < i; j++)
        System.out.print(" ");
      for (int j = 0; j <= 2 * (n-i-1); j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j < 2 * i + 1; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("12번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print(" ");
      for (int j = 0; j < (2 * i + 1); j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j <= i; j++)
        System.out.print(" ");
      for (int j = 0; j < 2 * (n - i - 1) - 1; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("13번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++)
        System.out.print("*");
      for (int j = 0; j < (2 * i + 1); j++)
        System.out.print(" ");
      for (int j = 0; j < n - i - 1; j++)
        System.out.print("*");
      System.out.print("\n");
    }
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      for (int j = 0; j < 2 * (n - i - 1) - 1; j++)
        System.out.print(" ");
      for (int j = 0; j <= i; j++)
        System.out.print("*");
      System.out.print("\n");
    }

    System.out.println();
    System.out.println();
    System.out.println("14번 프로그램");
    for (int i = 0; i < n; i++) {
      for (int k = 0; k < n - i - 1; k++)
        System.out.print(" ");
      for (int j = 0; j < n; j++) {
        for (int k = 0; k < (2 * i + 1); k++)
          System.out.print("*");
        for (int k = 0; k < 2 * (n - i - 1); k++)
          System.out.print(" ");
      }
      System.out.print("\n");
    }
  }
}
