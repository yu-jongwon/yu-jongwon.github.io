> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [if문 사용법](#if문-사용법)
    - [짝수만 출력하는 프로그램](#짝수만-출력하는-프로그램)
    - [짝수는 숫자, 홀수는 `*` 기호로 출력하는 프로그램](#짝수는-숫자-홀수는--기호로-출력하는-프로그램)
    - [짝수는 숫자, 홀수는 기호로 출력하는 프로그램](#짝수는-숫자-홀수는-기호로-출력하는-프로그램)
- [함수 사용법](#함수-사용법)
    - [함수를 만드는 방법](#함수를-만드는-방법)
    - [함수를 실행하는 방법](#함수를-실행하는-방법)
    - [함수의 실행 흐름](#함수의-실행-흐름)
    - [함수 호출 시에 값을 전달하고, 전달받는 방법](#함수-호출-시에-값을-전달하고-전달받는-방법)
    - [함수의 실행을 도중에 종료하는 방법](#함수의-실행을-도중에-종료하는-방법)
    - [값을 돌려주는 함수를 만드는 방법](#값을-돌려주는-함수를-만드는-방법)
- [함수를 사용하는 프로그램 만들기](#함수를-사용하는-프로그램-만들기)
    - [00번 프로그램 만들기](#00번-프로그램-만들기)
    - [01번 프로그램 만들기](#01번-프로그램-만들기)
    - [02번 프로그램 만들기](#02번-프로그램-만들기)
    - [03번 프로그램 만들기](#03번-프로그램-만들기)
    - [04번 프로그램 만들기](#04번-프로그램-만들기)
    - [05번 프로그램 만들기](#05번-프로그램-만들기)
    - [06번 프로그램 만들기](#06번-프로그램-만들기)
    - [07번 프로그램 만들기](#07번-프로그램-만들기)
    - [08번 프로그램 만들기](#08번-프로그램-만들기)
    - [09번 프로그램 만들기](#09번-프로그램-만들기)
    - [10번 프로그램 만들기](#10번-프로그램-만들기)

<!-- /code_chunk_output -->

# if문 사용법
식의 결과인 참 거짓에 따라 코드를 선택해 한 번만 실행하는 기능

### 짝수만 출력하는 프로그램

```java
for (int i = 0; i < 10; i = i + 1)
{
  if (i % 2 == 0)
  {
    System.out.printf("%3d", i);
  }
}
```
```
  0  2  4  6  8
```

### 짝수는 숫자, 홀수는 `*` 기호로 출력하는 프로그램
```java
for (int i = 0; i < 10; i = i + 1)
{
  if (i % 2 == 0)
  {
    System.out.printf("%3d", i);
  }
  else
  {
    System.out.print("  *");
  }
}
```
```
  0  *  2  *  4  *  6  *  8  *
```

### 짝수는 숫자, 홀수는 기호로 출력하는 프로그램
```java
for (int i = 0; i < 10; i = i + 1)
{
  if (i % 2 == 0)
  {
    System.out.printf("%3d", i);
  }
  else if (i == 1)
  {
    System.out.print("  !");
  }
  else if (i == 3)
  {
    System.out.print("  #");
  }
  else if (i == 5)
  {
    System.out.print("  %");
  }
  else
  {
    System.out.print("  *");
  }
}
```
```
  0  !  2  #  4  %  6  *  8  *
```

# 함수 사용법
함수는 관련있는 여러줄의 코드들을 하나로 묶어 이름을 붙이거나, 수학에서의 함수와 같이 입력값에 따른 결과값을 반환하는 기능이다.

### 함수를 만드는 방법
함수는 다음과 같이 만든다.
```java
class Main
{
  // f 라는 이름의 함수
  static void f()
  {
    System.out.println(0);  // 화면에 숫자 0 출력
  }

  public static void main(String[] args)
  {
  }
}
```
위 프로그램을 실행해보면 화면에 아무것도 출력되지 않는 것을 볼 수 있다. 함수를 만드는 것 자체로는 아무런 동작도 하지 않는다. 함수는 함수의 이름으로 함수를 실행해야 동작한다.

함수를 만드는 것을 함수를 `정의`한다고 한다.

### 함수를 실행하는 방법
정의한 함수를 실행하는 방법은 다음과 같다.
```java
class Main
{
  // f 라는 이름의 함수
  static void f()
  {
    System.out.println(0);  // 화면에 숫자 0 출력
  }

  public static void main(String[] args)
  {
    f();  // f 라는 이름의 함수 실행
  }
}
```
* 실행 결과
```
0

```
함수를 실행하는 것을 함수를 `호출`한다고 한다.

### 함수의 실행 흐름
다음 프로그램으로 함수 호출 시의 실행 흐름을 알아보자.
```java
class Main
{
  static void f1()
  {
    System.out.println("      f1() begin"); //  7
    System.out.println("      f1() end");   //  8
  }

  static void f2()
  {
    System.out.println("    f2() begin");   //  5
    f1();                                   //  6
    System.out.println("    f2() end");     //  9
  }

  static void f3()
  {
    System.out.println("  f3() begin");     //  3
    f2();                                   //  4
    System.out.println("  f3() end");       // 10
  }

  public static void main(String[] args)
  {
    System.out.println("program begin");    //  1
    f3();                                   //  2
    System.out.println("program end");      // 11
  }
}
```
* 실행 결과
```
program begin
  f3() begin
    f2() begin
      f1() begin
      f1() end
    f2() end
  f3() end
program end
```
함수를 호출하면 호출된 함수의 코드들이 모두 실행되기 전까지 다음 줄의 코드가 실행되지 않는다.
* `System.out.println("program end");` 코드는 `f3();` 코드에서 호출한 `f3` 함수의 코드들이 모두 실행되기 전까지 실행되지 않는다.
* `System.out.println("  f3() end");` 코드는 `f2();` 코드에서 호출한 `f2` 함수의 코드들이 모두 실행되기 전까지 실행되지 않는다.
* `System.out.println("    f2() end");` 코드는 `f1();` 코드에서 호출한 `f1` 함수의 코드들이 모두 실행되기 전까지 실행되지 않는다.

### 함수 호출 시에 값을 전달하고, 전달받는 방법
값을 전달받는 함수는 다음과 같이 작성한다. 함수 이름 뒤의 `(` 와 `)` 사이에 변수를 선언한다.
```java
class Main
{
  // a 라는 이름의 변수를 선언해 숫자 하나를 전달받는다.
  static void f(int a)
  {
    System.out.println(a);  // 전달받은 값 출력
  }

  public static void main(String[] args)
  {
  }
}
```
값을 전달받는 함수에 값을 전달하는 코드는 다음과 같이 작성한다.
```java
class Main
{
  // a 라는 이름의 변수를 선언해 숫자 하나를 전달받는다.
  static void f(int a)
  {
    System.out.println(a);  // 전달받은 값 출력
  }

  public static void main(String[] args)
  {
    f(0); // 숫자 0을 전달한다.
  }
}
```
* 실행 결과
```
0

```
다음과 같이 `,`를 사용해 두 개 이상의 값을 전달받고, 전달할 수 있다.
```java
class Main
{
  // a, b, c 라는 이름의 변수를 선언해 숫자 세 개를 전달받는다.
  static void f(int a, int b, int c)
  {
    System.out.println(a); // 전달받은 첫 번째 값 출력
    System.out.println(b); // 전달받은 두 번째 값 출력
    System.out.println(c); // 전달받은 세 번째 값 출력
  }

  public static void main(String[] args)
  {
    f(0, 1, 2); // 숫자 1, 2, 3을 전달한다.
  }
}
```
* 실행 결과
```
0
1
2

```
함수가 값을 전달받기 위해 `(` 와 `)` 사이에 선언한 변수를 `매개변수`라고 한다. 위 코드에서 `static void f(int a, int b, int c)`의 `(` 와 `)` 사이에 작성한 `int a`, `int b`, `int c`가 `매개변수`다.

함수에 값을 전달하기 위해 `(` 와 `)` 사이에 작성한 값을 `인자`라고 한다. 위 코드에서 `f(0, 1, 2);`의 `(` 와 `)` 사이에 작성한 `0`, `1`, `2`가 `인자`다.

### 함수의 실행을 도중에 종료하는 방법
다음과 같이 `return`문을 사용하면 함수를 실행 중에 임의로 종료시킬 수 있다.
```java
class Main
{
  static void f(int a)
  {
    if (a == 0)
    {
      return; // 함수 종료
    }
    System.out.println(a);
  }

  public static void main(String[] args)
  {
    f(0); // 화면에 아무것도 출력되지 않는다.
    f(1); // 화면에 숫자 1이 출력된다.
  }
}
```
* 실행 결과
```
1

```
`return` 코드가 실행되면 함수의 실행이 종료되며 이후의 코드들이 실행되지 않는다.

### 값을 돌려주는 함수를 만드는 방법
`return` 뒤에 돌려줄 값을 작성하면 함수를 호출한 곳으로 값을 돌려줄 수 있다. `return`은 함수를 종료하는 기능이므로, 함수를 종료하면서 값을 돌려준다.
```java
class Main
{
  // 호출 시 숫자 하나를 돌려주는 함수
  // void는 돌려주는 값이 없다는 의미이므로 int로 변경한다.
  static int f()
  {
    return 0; // 숫자 0을 돌려준다.
  }

  public static void main(String[] args)
  {
    System.out.println(f());  // 함수가 돌려주는 값 출력
  }
}
```
* 실행 결과
```
0

```
값을 돌려주는 함수를 호출하는 것은 그 자체가 값이 된다. 다시 말해 위 코드에서 `System.out.println(f());`의 `f()`는 하나의 값이다. 따라서 어떤 숫자 하나 혹은 변수 하나와 같다.

값을 돌려주는 것을 값을 `반환`한다고 한다.

# 함수를 사용하는 프로그램 만들기

### 00번 프로그램 만들기
```java
class Program106_00
{
  static void f()
  {
    System.out.println("Hello, World!");
  }

  public static void main(String[] args)
  {
    f();
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
다음과 같이 `Hello, World!`가 무한히 반복되어 나오도록 코드를 작성하자.
```
Hello, World!
Hello, World!
Hello, World!
Hello, World!
Hello, World!
...
```

### 01번 프로그램 만들기
```java
class Program106_01
{
  static void f(int n)
  {
    System.out.println("Hello, World!");
  }

  public static void main(String[] args)
  {
    var n = 5;
    f(n);
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
다음과 같이 `Hello, World!`가 `n`번만 반복되어 나오도록 코드를 작성하자.

n = 5 일 때,
```
Hello, World!
Hello, World!
Hello, World!
Hello, World!
Hello, World!
```
n이 5일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_01_hint {
  static void f1()
  {
    System.out.println("Hello, World!");
  }

  static void f2()
  {
    System.out.println("Hello, World!");
    f1();
  }

  static void f3()
  {
    System.out.println("Hello, World!");
    f2();
  }

  static void f4()
  {
    System.out.println("Hello, World!");
    f3();
  }

  static void f5()
  {
    System.out.println("Hello, World!");
    f4();
  }

  public static void main(String[] args)
  {
    f5();
  }
}
```

### 02번 프로그램 만들기
```java
class Program106_02
{
  static int f(int n)
  {
    return 0;
  }

  public static void main(String[] args)
  {
    var n = 5;
    System.out.println(f(n)); // 120
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
다음 표와 같이 `n`에 따른 값을 반환하는 함수를 작성하자.

|n|반환값|
|-:|-:|
| 0|      1|
| 1|      1|
| 2|      2|
| 3|      6|
| 4|     24|
| 5|    120|
| 6|    720|
| 7|   5040|
| 8|  40320|
| 9| 362880|
|10|3628800|

n이 5일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_02_hint {
  static int f1() { return 1; }
  static int f2() { return 2 * f1(); }
  static int f3() { return 3 * f2(); }
  static int f4() { return 4 * f3(); }
  static int f5() { return 5 * f4(); }

  public static void main(String[] args)
  {
    System.out.println(f5()); // 120
  }
}
```

### 03번 프로그램 만들기
```java
class Program106_03
{
  static int f(int a, int n)
  {
    return 0;
  }

  public static void main(String[] args)
  {
    var a = 2;
    var b = 5;
    System.out.println(f(a, b));  // 32
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
`a`의 `n` 제곱을 반환하는 프로그램을 작성하자.

### 04번 프로그램 만들기
```java
class Program106_04
{
  static int f(int n)
  {
    return 0;
  }

  public static void main(String[] args)
  {
    var n = 10;
    System.out.println(f(n)); // 55
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
다음 표와 같이 `n`에 따른 값을 반환하는 함수를 작성하자.

|n|반환값|
|-:|-:|
| 0| 0|
| 1| 1|
| 2| 1|
| 3| 2|
| 4| 3|
| 5| 5|
| 6| 8|
| 7|13|
| 8|21|
| 9|34|
|10|55|

n이 10일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_04_hint {
  static int f0() { return 0; }
  static int f1() { return 1; }
  static int f2() { return f1() + f0(); }
  static int f3() { return f2() + f1(); }
  static int f4() { return f3() + f2(); }
  static int f5() { return f4() + f3(); }
  static int f6() { return f5() + f4(); }
  static int f7() { return f6() + f5(); }
  static int f8() { return f7() + f6(); }
  static int f9() { return f8() + f7(); }
  static int f10() {return f9() + f8(); }

  public static void main(String[] args)
  {
    System.out.println(f10());  // 55
  }
}
```

### 05번 프로그램 만들기
```java
class Program106_05
{
  static int f(int a, int b)
  {
    return 0;
  }

  public static void main(String[] args)
  {
    var a = 60;
    var b = 48;
    System.out.println(f(a, b));  // 12
  }
}
```
위 코드를 참고해 `for`나 `while`을 사용하지 않고 함수만 사용해서,
`a`와 `b`의 최대공약수를 반환하는 프로그램을 작성하자.

`60`과 `48`을 `a`와 `b`라고 했을 때, 최대공약수인 `12`를 구하는 과정은 다음과 같다. `a % b`가 0이면 `b`가 최대공약수가 된다.

|a|b|a % b|
|:-:|:-:|:-:|
|60|48|12|
|48|12|12|
|12|12|0|

|a|b|a % b|
|:-:|:-:|:-:|
|1071|1029|42|
|1029|42|21|
|42|21|0|

### 06번 프로그램 만들기
```java
class Program106_06
{
  static void f(int n, int[] result, int index)
  {
    if (index == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    // 여기에 코드를 작성해 완성하자.
  }

  public static void main(String[] args)
  {
    var n = 3;
    var result = new int[n];
    f(n, result, 0);
  }
}
```
위 코드를 참고해 다음과 같이 출력하는 프로그램을 작성하자.

n = 1 일 때의 출력 결과
```
  0
```
n = 2 일 때의 출력 결과
```
  0  0
  0  1
  1  0
  1  1
```
n = 3 일 때의 출력 결과
```
  0  0  0
  0  0  1
  0  0  2
  0  1  0
  0  1  1
  0  1  2
  0  2  0
  0  2  1
  0  2  2
  1  0  0
  1  0  1
  1  0  2
  1  1  0
  1  1  1
  1  1  2
  1  2  0
  1  2  1
  1  2  2
  2  0  0
  2  0  1
  2  0  2
  2  1  0
  2  1  1
  2  1  2
  2  2  0
  2  2  1
  2  2  2
```
n이 3일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_06_hint
{
  public static void main(String[] args)
  {
    var result = new int[3];
    for (var i = 0; i < 3; i = i + 1)
    {
      result[0] = i;
      for (var j = 0; j < 3; j = j + 1)
      {
        result[1] = j;
        for (var k = 0; k < 3; k = k + 1)
        {
          result[2] = k;
          for (var l = 0; l < 3; l = l + 1)
          {
            System.out.printf("%3d", result[l]);
          }
          System.out.println();
        }
      }
    }
  }
}
```
n이 3일 때의 함수 호출에 따른 배열값의 변화는 다음과 같다.
```py
index=0 index=1 index=2 index=3
[0 _ _]
        [0 0 _]
                [0 0 0] 출력
                [0 0 1] 출력
                [0 0 2] 출력
        [0 1 _]
                [0 1 0] 출력
                [0 1 1] 출력
                [0 1 2] 출력
        [0 2 _]
                [0 2 0] 출력
                [0 2 1] 출력
                [0 2 2] 출력
[1 _ _]
        [1 0 _]
                [1 0 0] 출력
                [1 0 1] 출력
                [1 0 2] 출력
        [1 1 _]
                [1 1 0] 출력
                [1 1 1] 출력
                [1 1 2] 출력
        [1 2 _]
                [1 2 0] 출력
                [1 2 1] 출력
                [1 2 2] 출력
[2 _ _]
        [2 0 _]
                [2 0 0] 출력
                [2 0 1] 출력
                [2 0 2] 출력
        [2 1 _]
                [2 1 0] 출력
                [2 1 1] 출력
                [2 1 2] 출력
        [2 2 _]
                [2 2 0] 출력
                [2 2 1] 출력
                [2 2 2] 출력
```

### 07번 프로그램 만들기
```java
class Program106_07
{
  static void f(int n, int[] result, int index, int begin)
  {
    if (index == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    // 여기에 코드를 작성해 완성하자.
  }

  public static void main(String[] args)
  {
    var n = 3;
    var result = new int[n];
    f(n, result, 0, 0);
  }
}
```
위 코드를 참고해 다음과 같이 출력하는 프로그램을 작성하자.

n = 1 일 때의 출력 결과
```
  0
```
n = 2 일 때의 출력 결과
```
  0  0
  0  1
  1  1
```
n = 3 일 때의 출력 결과
```
  0  0  0
  0  0  1
  0  0  2
  0  1  1
  0  1  2
  0  2  2
  1  1  1
  1  1  2
  1  2  2
  2  2  2
```
n이 3일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_07_hint
{
  public static void main(String[] args)
  {
    var result = new int[3];
    for (var i = 0; i < 3; i = i + 1)
    {
      result[0] = i;
      for (var j = i; j < 3; j = j + 1)
      {
        result[1] = j;
        for (var k = j; k < 3; k = k + 1)
        {
          result[2] = k;
          for (var l = 0; l < 3; l = l + 1)
          {
            System.out.printf("%3d", result[l]);
          }
          System.out.println();
        }
      }
    }
  }
}
```

### 08번 프로그램 만들기
```java
class Program106_08
{
  static void f(int n, int m, int[] result, int index, int begin)
  {
    if (index == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    // 여기에 코드를 작성해 완성하자.
  }

  public static void main(String[] args)
  {
    var n = 3;
    var m = 5;
    var result = new int[n];
    f(n, m, result, 0, 0);
  }
}
```
위 코드를 참고해 다음과 같이 출력하는 프로그램을 작성하자.

n = 1, m = 5 일 때의 출력 결과
```
  0
  1
  2
  3
  4
```
n = 2, m = 5 일 때의 출력 결과
```
  0  1
  0  2
  0  3
  0  4
  1  2
  1  3
  1  4
  2  3
  2  4
  3  4
```
n = 3, m = 5 일 때의 출력 결과
```
  0  1  2
  0  1  3
  0  1  4
  0  2  3
  0  2  4
  0  3  4
  1  2  3
  1  2  4
  1  3  4
  2  3  4
```
n = 4, m = 5 일 때의 출력 결과
```
   0  1  2  3
   0  1  2  4
   0  1  3  4
   0  2  3  4
   1  2  3  4
```
n = 5, m = 5 일 때의 출력 결과
```
  0  1  2  3  4
```
n이 3이고 m이 5일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_08_hint
{
  public static void main(String[] args)
  {
    var result = new int[3];
    for (var i = 0; i < 5; i = i + 1)
    {
      result[0] = i;
      for (var j = i + 1; j < 5; j = j + 1)
      {
        result[1] = j;
        for (var k = j + 1; k < 5; k = k + 1)
        {
          result[2] = k;
          for (var l = 0; l < 3; l = l + 1)
          {
            System.out.printf("%3d", result[l]);
          }
          System.out.println();
        }
      }
    }
  }
}
```

### 09번 프로그램 만들기
```java
class Program106_09
{
  static void f(int n, int[] result, int index, boolean[] used)
  {
    if (index == n) {
      for (var i = 0; i < n; i++) {
        System.out.printf("%3d", result[i]);
      }
      System.out.println();
      return;
    }
    // 여기에 코드를 작성해 완성하자.
  }

  public static void main(String[] args)
  {
    var n = 3;
    var result = new int[n];
    var used = new boolean[n];
    f(n, result, 0, used);
  }
}
```
위 코드를 참고해 다음과 같이 출력하는 프로그램을 작성하자.

n = 1 일 때의 출력 결과
```
  0
```
n = 2 일 때의 출력 결과
```
  0  1
  1  0
```
n = 3 일 때의 출력 결과
```
  0  1  2
  0  2  1
  1  0  2
  1  2  0
  2  0  1
  2  1  0
```
n이 3일 때의 실행 흐름은 다음 프로그램을 참고하자.
```java
class Program106_09_hint
{
  public static void main(String[] args)
  {
    var result = new int[3];
    var used = new boolean[3]; // boolean은 true/false 값을 의미한다.
    for (var i = 0; i < 3; i = i + 1)
    {
      // continue문은 이후의 코드들을 실행하지 않고,
      // 반복문의 시작 위치로 이동해 반복을 계속하도록 한다.
      if (used[i]) continue;
      used[i] = true;
      result[0] = i;
      for (var j = 0; j < 3; j = j + 1)
      {
        if (used[j]) continue;
        used[j] = true;
        result[1] = j;
        for (var k = 0; k < 3; k = k + 1)
        {
          if (used[k]) continue;
          used[k] = true;
          result[2] = k;
          for (var l = 0; l < 3; l = l + 1)
          {
            System.out.printf("%3d", result[l]);
          }
          System.out.println();
          used[k] = false;
        }
        used[j] = false;
      }
      used[i] = false;
    }
  }
}
```

### 10번 프로그램 만들기
```java
class Program106_10
{
  static int f(int n, char from, char middle, char to)
  {
    // 여기에 코드를 작성해 완성하자.
    // System.out.printf("Move %d from %c to %c\n", n, from, to);
    return 0;
  }

  public static void main(String[] args)
  {
    int n = 3;
    int count = f(n, 'A', 'B', 'C');
    System.out.printf("Moved %d times\n", count); // \n 은 줄바꿈 문자다.
  }
}
```
위 코드를 참고해 다음과 같이 출력하는 프로그램을 작성하자.

n = 1 일 때의 출력 결과
```
Move 1 from A to C
Moved 1 times
```
n = 2 일 때의 출력 결과
```
Move 1 from A to B
Move 2 from A to C
Move 1 from B to C
Moved 3 times
```
n = 3 일 때의 출력 결과
```
Move 1 from A to C
Move 2 from A to B
Move 1 from C to B
Move 3 from A to C
Move 1 from B to A
Move 2 from B to C
Move 1 from A to C
Moved 7 times
```
n = 4 일 때의 출력 결과
```
Move 1 from A to B
Move 2 from A to C
Move 1 from B to C
Move 3 from A to B
Move 1 from C to A
Move 2 from C to B
Move 1 from A to B
Move 4 from A to C
Move 1 from B to C
Move 2 from B to A
Move 1 from C to A
Move 3 from B to C
Move 1 from A to B
Move 2 from A to C
Move 1 from B to C
Moved 15 times
```
규칙은 다음과 같다.
* A에 있는 숫자를 모두 C에 옴기는 것이 목표다.
* 한 번에 한 개의 숫자만 옮길 수 있다.
* 큰 숫자는 작은 숫자 위에 올 수 없다.

다음은 n이 1일 때의 과정이다.
```
  A   B   C
  1
```
```
  A   B   C
          1
```
다음은 n이 2일 때의 과정이다.
```
  A   B   C
  2
  1
```
```
  A   B   C
  2   1
```
```
  A   B   C
      1   2
```
```
  A   B   C
          2
          1
```
다음은 n이 3일 때의 과정이다.
```
  A   B   C
  3
  2
  1
```
```
  A   B   C
  3       1
  2
```
```
  A   B   C
  3   2   1
```
```
  A   B   C
  3   2
      1
```
```
  A   B   C
      2   3
      1
```
```
  A   B   C
  1   2   3
```
```
  A   B   C
  1       3
          2
```
```
  A   B   C
          3
          2
          1
```
