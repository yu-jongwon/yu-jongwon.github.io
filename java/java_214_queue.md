> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

# 큐 (Queue)
리스트의 앞이나 뒤 중 한쪽 끝에서 데이터를 추가하고, 그 반대쪽에서 데이터를 삭제하는 자료구조를 큐라 한다. 데이터를 추가하는 방향과 삭제하는 방향이 반대다.

### 개요
`Queue`이라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|push(value)|최상단에 value 추가|
|pop()|최상단의 값을 제거하고 반환|
|print()|값들을 순서대로 출력|

사용법과 동작 방식은 다음과 같다.
```java
class Queue {
  public static void main(String[] args) {
    var q = new Queue();  q.print();
    q.push(1);            q.print();
    q.push(2);            q.print();
    q.push(3);            q.print();
    q.push(4);            q.print();
    q.push(5);            q.print();
    q.pop();              q.print();
    q.pop();              q.print();
    q.pop();              q.print();
    q.pop();              q.print();
    q.pop();              q.print();
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
[2, 3, 4, 5]
[3, 4, 5]
[4, 5]
[5]
[]

```

### 구현하기
값을 저장하는 방식은 서큘러 링크드 리스트를 사용하자.
```java
class Queue {
  Node tail = new Node();

  Queue() {
    this.tail.next = this.tail;
  }

  public static void main(String[] args) {
    var q = new Queue();
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
|pop()|최하단의 값을 제거하고 반환|
|peek()|최하단의 값을 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|리스트 초기화|
|print()|값들을 순서대로 출력|
