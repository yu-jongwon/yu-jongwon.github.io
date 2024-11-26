> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [시작하기 전에](#시작하기-전에)
    - [자바 환경 설치 및 기본 코드 실행 방법](#자바-환경-설치-및-기본-코드-실행-방법httpsyoutubejsaqyrcu_h4)
    - [가장 작은 자바 프로그램](#가장-작은-자바-프로그램)
    - [화면에 숫자를 출력하는 방법](#화면에-숫자를-출력하는-방법)
    - [숫자를 대신하는 문자를 사용하는 방법](#숫자를-대신하는-문자를-사용하는-방법)
    - [코드를 반복해 실행하는 방법](#코드를-반복해-실행하는-방법)
- [입문 프로그램 만들기 2](#입문-프로그램-만들기-2)
    - [템플릿 프로그램](#템플릿-프로그램)
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
    - [11번 프로그램 만들기](#11번-프로그램-만들기)
    - [12번 프로그램 만들기](#12번-프로그램-만들기)
    - [13번 프로그램 만들기](#13번-프로그램-만들기)
    - [14번 프로그램 만들기](#14번-프로그램-만들기)
    - [15번 프로그램 만들기](#15번-프로그램-만들기)
    - [16번 프로그램 만들기](#16번-프로그램-만들기)
    - [17번 프로그램 만들기](#17번-프로그램-만들기)
    - [18번 프로그램 만들기](#18번-프로그램-만들기)
    - [19번 프로그램 만들기](#19번-프로그램-만들기)
    - [20번 프로그램 만들기](#20번-프로그램-만들기)
    - [21번 프로그램 만들기](#21번-프로그램-만들기)
    - [22번 프로그램 만들기](#22번-프로그램-만들기)

<!-- /code_chunk_output -->

# 시작하기 전에

### [자바 환경 설치 및 기본 코드 실행 방법](https://youtu.be/jsaqYRCU_h4)

### 가장 작은 자바 프로그램
오류가 없는 최소한의 자바 프로그램은 다음과 같다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
  }
}
```
* 터미널 (실행 결과, 아무런 메세지 없이 프로그램이 실행되었다가 종료된다.)
```
> java Main.java
>
```
`//`로 시작하는 줄은 실행되지 않는 코드다. `주석`이라고 한다.

### 화면에 숫자를 출력하는 방법
화면에 숫자 `0`을 출력하는 프로그램은 다음과 같다. `System.out.println(0);` 코드가 화면에 숫자 `0`을 출력한다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(0);  // 화면에 숫자 0을 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0

```
숫자 `0`이 출력되는 이유는 `(` 와 `)` 사이에 숫자 `0`이 있기 때문이다. 다음과 같이 숫자 `0`을 `1`로 바꾸면 `1`이 출력된다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(1);  // 화면에 숫자 1을 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
1

```
다음과 같이 프로그램을 작성하면 두 줄에 걸쳐 숫자 `0`과 `1`이 출력된다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(0);  // 화면에 숫자 0을 출력한다.
    System.out.println(1);  // 화면에 숫자 1을 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0
1

```
숫자를 적을 수 있는 곳에는 식을 사용할 수 있다. 다음과 같이 `(` 와 `)` 사이에 식을 작성하면, 식이 계산되어 그 결과가 화면에 출력된다. 코딩에서는 숫자 하나도 식이다. 숫자를 적을 수 있는 곳에는 식을 적을 수 있다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(1+2);   // 화면에 식 1+2를 계산해 그 결과를 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
3

```
다음과 같이 `(` 와 `)` 사이에 숫자를 넣지 않으면 `줄바꿈`만 출력된다. `System.out.println();` 코드는 기본적으로 `줄바꿈`을 화면에 출력한다. 정리하면, `(` 와 `)` 사이에 숫자가 있으면 숫자와 `줄바꿈`을 출력하고, 숫자가 없으면 `줄바꿈`만 출력한다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println();   // 화면에 줄바꿈만 출력한다.
    System.out.println(1);  // 화면에 숫자 1을 출력한 후, 줄바꿈을 출력한다.
  }
}
```
* 터미널 (실행 결과, 숫자 1이 두 번째 줄에 출력된다.)
```
> java Main.java

1

```
`System.out.println();` 코드와 달리 `System.out.print();` 코드는 화면에 `줄바꿈`을 출력하지 않는다. 기본적인 사용법은 기존과 동일하다. 다음 프로그램의 결과를 참고하자.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.print(0);    // 화면에 숫자 0만 출력한다.
    System.out.println(1);  // 화면에 숫자 1과 줄바꿈을 출력한다.
    System.out.print(2);    // 화면에 숫자 2를 출력한다.
    System.out.println(3);  // 화면에 숫자 3과 줄바꿈을 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
01
23

```
다음과 같이 `System.out.printf("%3d", 0);` 코드를 사용하면 숫자 `0`을 세 칸에 맞추어 출력한다. `System.out.print();` 코드와 마찬가지로 `줄바꿈`을 화면에 출력하지 않는다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.printf("%3d", 0);  // 화면에 숫자 0을 세 칸을 차지하도록 출력한다.
    System.out.printf("%3d", 1);  // 화면에 숫자 1을 세 칸을 차지하도록 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
  0  1
```

### 숫자를 대신하는 문자를 사용하는 방법
숫자 `0`은 `0`일 뿐이고, 숫자 `1`은 `1`일 뿐이다. 다시 말해 변하지 않는 수다. 변하지 않는 수를 `항상 같은 수`라는 의미로 `상수`라고 한다. 코딩에서는 숫자 대신 `a`, `b`, `c`, ... 와 같은 알파벳을 사용해 숫자를 대신할 수 있다. 숫자를 대신하는 문자는 어떤 수도 될 수 있으므로, `변하는 수`라는 의미에서 `변수`라고 한다. 변수를 사용하는 프로그램은 다음과 같다. 다음 프로그램은 숫자 `0`을 대신하는 `n`이라는 이름의 변수를 만들고, 변수 `n`이 대신하고 있는 숫자를 화면에 출력한다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var n = 0;              // 숫자 0을 대신하는 n이라는 이름의 변수를 만든다.
    System.out.println(n);  // 화면에 변수 n이 대신하고 있는 숫자를 출력한다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0

```
변수는 어떤 수를 대신하는 문자이므로 다음과 같이 변수가 대신하고 있는 숫자를 다른 숫자로 바꿀 수 있다. 다음 코드는 변수 `n`이 숫자 `1`을 대신하도록 바꾸고, 변수 `n`이 대신하고 있는 숫자를 출력한다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var n = 0;
    System.out.println(n);
    n = 1;                  // 변수 n이 대신하고 있는 숫자를 1로 바꾼다.
    System.out.println(n);
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0
1

```
숫자를 사용할 수 있는 곳에는 식을 사용할 수 있으므로, 다음과 같이 식을 사용해 변수가 대신할 숫자를 바꿀 수도 있다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var n = 1 + 2;          // 식 1+2의 결과를 대신할 변수 n을 만든다.
    System.out.println(n);
    n = 3 + 4;              // 식 1+2의 결과로 변수 n이 대신할 숫자를 바꾼다.
    System.out.println(n);
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
3
7

```
변수는 어떤 숫자를 대신하는 문자이므로, 변수 또한 수다. 다음과 같이 식에 변수를 사용할 수도 있다. 다음 프로그램을 실행하면, 변수 `n`이 대신하는 숫자가 `1`이므로 식 `1 + 2`의 결과인 `3`이 출력된다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var n = 1;
    System.out.println(n + 2);  // 변수 n이 대신하고 있는 숫자가 1이므로, 1 + 2와 같다.
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
3

```
다음과 같이 변수가 대신할 숫자를 바꿀 때, 해당 변수가 현재 대신하고 있는 숫자를 사용할 수도 있다. 특별한 것처럼 말하긴 했지만, 특별할 것 없는 사용법이다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var n = 0;
    System.out.println(n);
    n = n + 1;              // 변수 n이 대신하고 있는 숫자가 0이므로, n = 0 + 1 과 같다.
    System.out.println(n);
    n = n + 1;              // 변수 n이 대신하고 있는 숫자가 1이므로, n = 1 + 1 과 같다.
    System.out.println(n);
    n = n + 1;              // 변수 n이 대신하고 있는 숫자가 2이므로, n = 2 + 1 과 같다.
    System.out.println(n);
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0
1
2
3

```

### 코드를 반복해 실행하는 방법
다음 프로그램은 화면에 숫자 `0`과 `줄바꿈`을 출력한다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(0);
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0

```
별 의미는 없지만 화면에 숫자 `0`을 세 번 출력하는 프로그램을 작성한다고 하자. 가장 단순하게는 같은 코드를 세 번 반복해서 작성하는 방법이 있겠다. 프로그램은 다음과 같다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    System.out.println(0);
    System.out.println(0);
    System.out.println(0);
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0
0
0

```
`while문`이라는 기능을 사용하면 같은 코드를 여러번 작성하지 않고도 원하는 만큼 반복해서 실행시킬 수 있다. 프로그램은 다음과 같다.
```java
// filename : Main.java
class Main
{
  public static void main(String[] args)
  {
    var i = 0;
    while (i < 3) // 식 i < 3 이 참인 동안 다음의 { 와 } 사이의 코드들을 반복해서 실행한다.
    {
      System.out.println(0);  // 반복해서 실행되는 코드
      i = i + 1;              // 반복해서 실행되는 코드
    }
  }
}
```
* 터미널 (실행 결과)
```
> java Main.java
0
0
0

```
위 프로그램에서 `while (i < 3) { }` 코드는 `(` 과 `)` 사이의 식 `i < 3`의 결과가 `참`일 때까지 `{` 와 `}` 사이의 코드들을 반복해서 실행한다. 위 프로그램에서 `{` 와 `}` 사이의 코드는 다음과 같다.
```java
    {
      System.out.println(0);
      i = i + 1;
    }
```
숫자 `0`과 `줄바꿈`이 세 번 출력되는 이유는 `System.out.println(0);` 코드가 세 번 실행되기 때문이다. 그리고 세 번 실행되는 이유는 `while문`의 식이 `i < 3`이고, `i = i + 1;` 코드 또한 세 번 실행되기 때문이다. 변수 `i`의 값은 `0`에서 시작해 `1`씩 증가하면서 `3`이 되므로 식 `i < 3`의 결과가 `참` `참` `참` `거짓`이 된다.

# 입문 프로그램 만들기 2
* 사용할 수 있는 숫자와 변수는 다음과 같다.
  * 숫자 `0` `1` `2`
  * 변수 `n` `i`

### 템플릿 프로그램
* 다음 프로그램을 활용해서 프로그램을 만들어보자.
```java
// Program102_00.java
// 이 부분은 실행되지 않는다. 주석이라고 한다.
class Program102_00
{
  public static void main(String[] args)
  {
    var n = 5;
    var i = 0;
    while (i < n)
    {
      System.out.println(i);
      i = i + 1;
    }
  }
}
```
* 터미널 (실행 결과)
```
  0
  1
  2
  3
  4
```
위 프로그램에서 `System.out.println(i);` 코드의 `(` 와 `)` 사이의 `i` 부분을`java_101_introduction.html` 파일에서 작성한 식들로 순서대로 하나씩 바꾸어 넣어 실행해보자.

### 00번 프로그램 만들기
n = 5 일 때의 출력 결과
```
1
2
3
4
5
```

### 01번 프로그램 만들기
n = 5 일 때의 출력 결과
```
0
5
10
15
20
```

### 02번 프로그램 만들기
n = 5 일 때의 출력 결과
```
1
6
11
16
21
```

### 03번 프로그램 만들기
n = 5 일 때의 출력 결과
```
5
10
15
20
25
```

### 04번 프로그램 만들기
n = 5 일 때의 출력 결과
```
5
4
3
2
1
```

### 05번 프로그램 만들기
n = 5 일 때의 출력 결과
```
25
20
15
10
5
```

### 06번 프로그램 만들기
n = 5 일 때의 출력 결과
```
4
3
2
1
0
```

### 07번 프로그램 만들기
n = 5 일 때의 출력 결과
```
20
15
10
5
0
```

### 08번 프로그램 만들기
n = 5 일 때의 출력 결과
```
0
2
4
6
8
```

### 09번 프로그램 만들기
n = 5 일 때의 출력 결과
```
1
3
5
7
9
```

### 10번 프로그램 만들기
n = 5 일 때의 출력 결과
```
2
4
6
8
10
```

### 11번 프로그램 만들기
n = 5 일 때의 출력 결과
```
10
8
6
4
2
```

### 12번 프로그램 만들기
n = 5 일 때의 출력 결과
```
8
6
4
2
0
```

### 13번 프로그램 만들기
n = 5 일 때의 출력 결과
```
0
1
0
1
0
```

### 14번 프로그램 만들기
n = 5 일 때의 출력 결과
```
1
0
1
0
1
```

### 15번 프로그램 만들기
n = 6 일 때의 출력 결과
```
0
0
1
1
2
2
```

### 16번 프로그램 만들기
n = 6 일 때의 출력 결과
```
0
0
1
1
0
0
```

### 17번 프로그램 만들기
n = 5 일 때의 출력 결과
```
false
false
true
false
false
```

### 18번 프로그램 만들기
n = 5 일 때의 출력 결과
```
true
true
false
true
true
```

### 19번 프로그램 만들기
n = 5 일 때의 출력 결과
```
true
true
false
false
false
```

### 20번 프로그램 만들기
n = 5 일 때의 출력 결과
```
false
false
false
true
true
```

### 21번 프로그램 만들기
n = 5 일 때의 출력 결과
```
true
true
true
false
false
```

### 22번 프로그램 만들기
n = 5 일 때의 출력 결과
```
false
false
true
true
true
```
