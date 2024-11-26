> Python by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [더블리 링크드 리스트 (Doubly Linked List)](#더블리-링크드-리스트-doubly-linked-list)
    - [개요](#개요)
    - [노드](#노드)
    - [해드 노드](#해드-노드)
    - [뒤에 값을 추가하는 방법](#뒤에-값을-추가하는-방법)
    - [앞에 값을 추가하는 방법](#앞에-값을-추가하는-방법)
    - [앞의 값을 제거하는 방법](#앞의-값을-제거하는-방법)
    - [뒤의 값을 제거하는 방법](#뒤의-값을-제거하는-방법)
    - [구현하기](#구현하기)
    - [구현할 메서드 목록](#구현할-메서드-목록)

<!-- /code_chunk_output -->

# 더블리 링크드 리스트 (Doubly Linked List)
더블리 링크드 리스트는 링크드 리스트의 한 종류다. 더블리 링크드 리스트에서의 노드는 다음 노드를 가리키는 `next` 변수와 더불어 이전 노드를 가리키는 `prev` 변수를 가진다. 또한 서큘러 링크드 리스트에서와 마찬가지로, 마지막 노드가 `해드` 노드를 다음 노드로 가리키고, `해드` 노드가 마지막 노드를 이전 노드로 가리키도록 설정해 연결이 앞과 뒤로 순환하도록 한다.

### 개요
`DoublyLinkedList`라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|push_front(value)|앞에 value를 추가한다.|
|push_back(value)|뒤에 value를 추가한다.|
|pop_front()|앞의 값을 제거한다.|
|pop_back()|뒤의 값을 제거한다.|
|print()|값들을 순서대로 출력한다.|

사용법과 동작 방식은 다음과 같다.
```py
l = DoublyLinkedList(); l.print()
l.push_back(1);         l.print()
l.push_back(2);         l.print()
l.push_front(3);        l.print()
l.push_front(4);        l.print()
l.pop_back();           l.print()
l.pop_back();           l.print()
l.pop_front();          l.print()
l.pop_front();          l.print()
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
이전 노드를 가리키는 `prev` 변수를 추가한다.
```py
# 노드라는 이름의 클래스를 정의한다.
class Node:
  def __init__(self, value = None, prev = None, next = None):
    self.value = value  # 값을 보관한다.
    self.prev = prev    # 다음 노드를 가리킨다.
    self.next = next    # 이전 노드를 가리킨다.
```

### 해드 노드
구현의 편의를 위한 `해드` 노드를 생성해 사용한다.
```py
head = Node()     # 해드용 노드를 생성해 head 라는 이름의 변수로 참조한다.
head.prev = head  # 해드의 이전 노드를 해드로 설정해 연결이 뒤로 순환되도록 한다.
head.next = head  # 해드의 다음 노드를 해드로 설정해 연결이 앞으로 순환되도록 한다.
```

### 뒤에 값을 추가하는 방법
새 노드의 이전 노드를 마지막 노드로 설정하고, 새 노드의 다음 노드를 `해드`로 설정한다. 마찬가지로 마지막 노드의 다음 노드를 새 노드로 설정하고, `해드`의 이전 노드를 새 노드로 설정해 노드들의 연결이 앞과 뒤로 순환하도록 한다.
```py
# 값이 1인 노드를 생성해 뒤에 추가한다.
head.next = Node(1, head, head.next)
head.prev = head.next
# 값이 2인 노드를 생성해 뒤에 추가한다.
head.next.next = Node(2, head.next, head.next.next)
head.prev = head.next.next
# 값이 3인 노드를 생성해 뒤에 추가한다.
head.next.next.next = Node(3, head.next.next, head.next.next.next)
head.prev = head.next.next.next

# 해드로부터 연결된 노드들을 앞으로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != head:
  print(f'{node.value:3}', end='')
  node = node.next
print()

# 해드로부터 연결된 노드들을 뒤로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.prev
while node != head:
  print(f'{node.value:3}', end='')
  node = node.prev
print()
```
* 실행 결과
```py
  1  2  3
  3  2  1

```

### 앞에 값을 추가하는 방법
앞에 값을 추가하는 방법은 리스트에 값이 없을 때 뒤에 값을 추가하는 방법과 동일하다. 새 노드의 이전 노드를 `해드`로 설정하고, 새 노드의 다음 노드를 `해드`의 다음 노드로 설정한다. 마찬가지로 `해드`의 다음 노드를 새 노드로 설정하고, `해드`의 이전 노드를
```py
# 값이 4인 노드를 생성해 앞에 추가한다.
head.next.prev = Node(4, head, head.next)
head.next = head.next.prev
# 값이 5인 노드를 생성해 앞에 추가한다.
head.next.prev = Node(5, head, head.next)
head.next = head.next.prev
# 값이 6인 노드를 생성해 앞에 추가한다.
head.next.prev = Node(6, head, head.next)
head.next = head.next.prev

# 해드로부터 연결된 노드들을 앞으로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != head:
  print(f'{node.value:3}', end='')
  node = node.next
print()

# 해드로부터 연결된 노드들을 뒤로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.prev
while node != head:
  print(f'{node.value:3}', end='')
  node = node.prev
print()
```
* 실행 결과
```py
  6  5  4  1  2  3
  3  2  1  4  5  6

```

### 앞의 값을 제거하는 방법
첫 번째 노드에 앞과 뒤로 연결된 두 노드가 서로를 앞과 뒤로 연결하도록 설정한다. 두 번째 노드의 이전 노드를 `해드`로 설정하고, `해드`의 다음 노드를 두 번째 노드로 설정한다.
```py
# 값이 6인 노드의 연결을 끊었다.
head.next.next.prev = head
head.next = head.next.next
# 값이 5인 노드의 연결을 끊었다.
head.next.next.prev = head
head.next = head.next.next
# 값이 4인 노드의 연결을 끊었다.
head.next.next.prev = head
head.next = head.next.next

# 해드로부터 연결된 노드들을 앞으로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != head:
  print(f'{node.value:3}', end='')
  node = node.next
print()

# 해드로부터 연결된 노드들을 뒤로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.prev
while node != head:
  print(f'{node.value:3}', end='')
  node = node.prev
print()
```
* 실행 결과
```py
  1  2  3
  3  2  1

```

### 뒤의 값을 제거하는 방법
뒤의 값을 제거하는 방법은 앞의 값을 제거하는 방법을 반대로 한다. 마지막 노드에 앞과 뒤로 연결된 두 노드가 서로를 앞과 뒤로 연결하도록 설정한다. 끝에서 두 번째 노드의 다음 노드를 `해드`로 설정하고, `해드`의 이전 노드를 끝에서 두 번째 노드로 설정한다.
```py
# 값이 3인 노드의 연결을 끊었다.
head.prev.prev.next = head
head.prev = head.prev.prev
# 값이 2인 노드의 연결을 끊었다.
head.prev.prev.next = head
head.prev = head.prev.prev
# 값이 1인 노드의 연결을 끊었다.
head.prev.prev.next = head
head.prev = head.prev.prev

# 해드로부터 연결된 노드들을 앞으로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != head:
  print(f'{node.value:3}', end='')
  node = node.next
print()

# 해드로부터 연결된 노드들을 뒤로 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.prev
while node != head:
  print(f'{node.value:3}', end='')
  node = node.prev
print()
```
* 실행 결과
```py

```

### 구현하기
```py
class Node:
  def __init__(self, value = None, prev = None, next = None):
    self.value = value
    self.prev = prev
    self.next = next

class DoublyLinkedList:
  def __init__(self):
    self.head = Node()
    self.head.prev = self.head
    self.head.next = self.head

l = DoublyLinkedList()
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
|push_front(value)|맨 앞에 value 추가|
|push_back(value)|마지막에 value 추가|
|pop_front()|첫 번째 값을 제거하고 반환|
|pop_back()|마지막 값을 제거하고 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|리스트 초기화|
|sort()|값들을 버블 정렬로 정렬|
|reverse()|값들의 순서 뒤집기|
|print()|값들을 순서대로 출력|
