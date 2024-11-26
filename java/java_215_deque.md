> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [덱 (Deque)](#덱-deque)
    - [개요](#개요)
    - [구현하기](#구현하기)
    - [구현할 메서드 목록](#구현할-메서드-목록)

<!-- /code_chunk_output -->

# 덱 (Deque)
리스트의 양쪽 끝에서 데이터를 추가하고 삭제하는 자료구조를 덱이라고 한다. 스택과 큐를 합한 형태다.

### 개요
`Deque`이라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|pushFront(value)|최상단에 value 추가|
|pushBack(value)|최하단에 value 추가|
|popFront()|최상단의 값을 제거하고 반환|
|popBack()|최하단의 값을 제거하고 반환|
|print()|값들을 순서대로 출력|

사용법과 동작 방식은 다음과 같다.
```java
class Deque {
  public static void main(String[] args) {
    var d = new Deque();  d.print();
    d.pushBack(1);        d.print();
    d.pushBack(2);        d.print();
    d.pushBack(3);        d.print();
    System.out.println();
    d.pushFront(4);       d.print();
    d.pushFront(5);       d.print();
    d.pushFront(6);       d.print();
    System.out.println();
    d.popFront();         d.print();
    d.popFront();         d.print();
    d.popFront();         d.print();
    System.out.println();
    d.popBack();          d.print();
    d.popBack();          d.print();
    d.popBack();          d.print();
  }
}
```
* 실행 결과
```
[]
[1]
[1, 2]
[1, 2, 3]

[4, 1, 2, 3]
[5, 4, 1, 2, 3]
[6, 5, 4, 1, 2, 3]

[5, 4, 1, 2, 3]
[4, 1, 2, 3]
[1, 2, 3]

[1, 2]
[1]
[]

```

### 구현하기
값을 저장하는 방식은 더블리 링크드 리스트를 사용하자.
```java
class Deque {
  Node head = new Node();

  Deque() {
    this.head.prev = this.head;
    this.head.next = this.head;
  }

  public static void main(String[] args) {
    var d = new Deque();
  }
}

class Node {
  int value = 0;
  Node prev = null;
  Node next = null;

  Node() {}

  Node(int value) {
    this.value = value;
  }

  Node(int value, Node prev, Node next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
```

### 구현할 메서드 목록
클래스에 다음 메서드들을 정의하고 기능을 구현하자.
|메서드|동작|
|-|-|
|push_front(value)|최상단에 value 추가|
|push_back(value)|최하단에 value 추가|
|pop_front()|최상단의 값을 제거하고 반환|
|pop_back()|최하단의 값을 제거하고 반환|
|front()|최상단의 값을 반환|
|back()|최하단의 값을 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|리스트 초기화|
|print()|값들을 순서대로 출력|
