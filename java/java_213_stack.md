> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [스택 (Stack)](#스택-stack)
    - [개요](#개요)
    - [구현하기](#구현하기)
    - [구현할 메서드 목록](#구현할-메서드-목록)

<!-- /code_chunk_output -->

# 스택 (Stack)
리스트의 앞이나 뒤 중 한쪽 끝에서만 데이터를 추가하고 삭제하는 자료구조를 스택이라 한다. 데이터를 추가하는 방향과 삭제하는 방향이 같다.

### 개요
`Stack`이라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|push(value)|최상단에 value 추가|
|pop()|최상단의 값을 제거하고 반환|
|print()|값들을 순서대로 출력|

사용법과 동작 방식은 다음과 같다.
```java
class Stack {
  public static void main(String[] args) {
    var s = new Stack();  s.print();
    s.push(1);            s.print();
    s.push(2);            s.print();
    s.push(3);            s.print();
    s.push(4);            s.print();
    s.push(5);            s.print();
    s.pop();              s.print();
    s.pop();              s.print();
    s.pop();              s.print();
    s.pop();              s.print();
    s.pop();              s.print();
  }
}
```
* 실행 결과
```
[]
[1]
[1, 2]
[1, 2, 3]
[1, 2, 3, 4]
[1, 2, 3, 4, 5]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2]
[1]
[]

```

### 구현하기
값을 저장하는 방식은 싱글리 링크드 리스트를 사용하자.
```java
class Stack {
  Node head = new Node();

  public static void main(String[] args) {
    var s = new Stack();
  }
}

class Node {
  int value = 0;
  Node next = null;

  Node() {}

  Node(int value) {
    this.value = value;
  }

  Node(int value, Node next) {
    this.value = value;
    this.next = next;
  }
}
```

### 구현할 메서드 목록
클래스에 다음 메서드들을 정의하고 기능을 구현하자.
|메서드|동작|
|-|-|
|push(value)|최상단에 value 추가|
|pop()|최상단의 값을 제거하고 반환|
|peek()|최상단의 값을 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|리스트 초기화|
|print()|값들을 순서대로 출력|
