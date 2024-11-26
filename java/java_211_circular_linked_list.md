> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

# 서큘러 링크드 리스트 (Circular Linked List)
서큘러 링크드 리스트는 링크드 리스트의 한 종류다. 싱글리 링크드 리스트에서는 `head` 변수가 항상 `해드` 노드를 참조했다면, 서큘러 링크드 리스트에서는 `tail`이라는 이름의 변수로 항상 마지막 값 노드를 참조한다. 그리고 마지막 노드가 `해드` 노드를 참조하도록 설정해 연결이 순환되도록 한다.

### 개요
`CircularLinkedList`라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|pushFront(value)|앞에 value를 추가한다.|
|pushBack(value)|뒤에 value를 추가한다.|
|popFront()|앞의 값을 제거한다.|
|popBack()|뒤의 값을 제거한다.|
|print()|값들을 순서대로 출력한다.|

사용법과 동작 방식은 다음과 같다.
```java
class CircularLinkedList {
  public static void main(String[] args) {
    var l = new CircularLinkedList(); l.print();
    l.pushBack(1);                    l.print();
    l.pushBack(2);                    l.print();
    l.pushFront(3);                   l.print();
    l.pushFront(4);                   l.print();
    l.popBack();                      l.print();
    l.popBack();                      l.print();
    l.popFront();                     l.print();
    l.popFront();                     l.print();
  }
}
```
* 실행 결과
```
[]
[1]
[1, 2]
[3, 1, 2]
[4, 3, 1, 2]
[4, 3, 1]
[4, 3]
[4]
[]

```

### 노드
노드 클래스는 싱글리 링크드 리스트와 동일하다. 다음과 같다.
```java
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

### 해드 노드
싱글리 링크드 리스트와 마찬가지로 구현의 편의를 위한 `해드` 노드를 생성해 사용한다. 그리고 `해드`를 `head`라는 이름의 변수 대신 `tail`이라는 이름의 변수로 참조한다.
```java
var tail = new Node();  // 해드용 노드를 생성해 tail 라는 이름의 변수로 참조한다.
tail.next = tail;       // 해드의 다음 노드를 해드로 설정해 연결이 순환되도록 한다.
```
`tail` 변수는 리스트에 값이 없을 때는 `해드` 노드를 가리키지만, 값이 있을 때에는 마지막 값 노드를 가리킨다.

### 뒤에 값을 추가하는 방법
서큘러 링크드 리스트에서는 연결이 순환되며 `tail` 변수가 마지막 노드를 참조한다. 따라서 `tail` 변수가 참조하는 노드의 다음 노드는 `해드`다. 새 노드의 다음 노드를 `해드`로 설정하고, 마지막 노드의 다음 노드를 새 노드로 설정하고, `tail`이 새 노드를 참조하도록 한다.
```java
// 값이 1인 노드를 생성해 뒤에 추가하고, tail이 새 노드를 가리키도록 한다.
tail.next = new Node(1, tail.next);
tail = tail.next;
// 값이 2인 노드를 생성해 뒤에 추가하고, tail이 새 노드를 가리키도록 한다.
tail.next = new Node(2, tail.next);
tail = tail.next;
// 값이 3인 노드를 생성해 뒤에 추가하고, tail이 새 노드를 가리키도록 한다.
tail.next = new Node(3, tail.next);
tail = tail.next;

// 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
var head = tail.next;
var node = head.next;
while (node != head) {
  System.out.printf("%3d", node.value);
  node = node.next;
}
System.out.println();
```
* 실행 결과
```java
  1  2  3

```

### 앞에 값을 추가하는 방법
`tail` 변수의 다음 노드는 `해드`다. 새 노드의 다음 노드를 첫 번째 값 노드로 설정하고, 해드의 다음 노드를 새 노드로 설정한다.
```java
head = tail.next;
head.next = new Node(4, head.next); // 값이 4인 노드를 생성해 앞에 추가한다.
head.next = new Node(5, head.next); // 값이 5인 노드를 생성해 앞에 추가한다.
head.next = new Node(6, head.next); // 값이 6인 노드를 생성해 앞에 추가한다.

// 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
head = tail.next;
node = head.next;
while (node != head) {
  System.out.printf("%3d", node.value);
  node = node.next;
}
System.out.println();
```
* 실행 결과
```java
  6  5  4  1  2  3

```

### 앞의 값을 제거하는 방법
`해드`의 다음 노드를 첫 번째 값 노드의 다음 노드로 설정한다.
```java
head = tail.next;
head.next = head.next.next; // 값이 6인 노드의 연결을 끊었다.
head.next = head.next.next; // 값이 5인 노드의 연결을 끊었다.
head.next = head.next.next; // 값이 4인 노드의 연결을 끊었다.

// 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
head = tail.next;
node = head.next;
while (node != head) {
  System.out.printf("%3d", node.value);
  node = node.next;
}
System.out.println();
```
* 실행 결과
```java
  1  2  3

```

### 뒤의 값을 제거하는 방법
끝에서 두 번째 노드의 다음 노드를 `해드`로 설정한다.
```java
head = tail.next;
head.next.next.next = head; // 값이 3인 노드의 연결을 끊었다.
head.next.next = head;      // 값이 2인 노드의 연결을 끊었다.
head.next = head;           // 값이 1인 노드의 연결을 끊었다.

// 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
head = tail.next;
node = head.next;
while (node != head) {
  System.out.printf("%3d", node.value);
  node = node.next;
}
System.out.println();
```
* 실행 결과
```java

```

### 구현하기
```java
class CircularLinkedList {
  Node tail = new Node();

  CircularLinkedList() {
    this.tail.next = this.tail;
  }

  public static void main(String[] args) {
    var l = new CircularLinkedList();
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
|insert(index, value)|index 위치에 value 추가|
|delete(index)|index 위치의 값을 삭제|
|get(index)|index 위치의 값 반환|
|set(index, value)|index 위치에 value 저장|
|find(value)|value와 같은 첫 번째 값의 인덱스 반환|
|front()|첫 번째 값 반환|
|back()|마지막 값 반환|
|pushFront(value)|맨 앞에 value 추가|
|pushBack(value)|마지막에 value 추가|
|popFront()|첫 번째 값을 제거하고 반환|
|popBack()|마지막 값을 제거하고 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|리스트 초기화|
|sort()|가장 작은 값을 찾아 앞에서부터 정렬|
|reverse()|값들의 순서 뒤집기|
|print()|값들을 순서대로 출력|
