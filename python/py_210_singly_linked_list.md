> Python by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [싱글리 링크드 리스트 (Singly Linked List)](#싱글리-링크드-리스트-singly-linked-list)
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

# 싱글리 링크드 리스트 (Singly Linked List)
리스트를 구현하는 방법에는 몇 가지가 있다. 배열을 사용해 구현하는 어레이 리스트와는 다르게 `링크드 리스트`는 `노드`라는 클래스를 만들어 구현한다.

### 개요
`SinglyLinkedList`라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.

|메서드|설명|
|-|-|
|push_front(value)|앞에 value를 추가한다.|
|push_back(value)|뒤에 value를 추가한다.|
|pop_front()|앞의 값을 제거한다.|
|pop_back()|뒤의 값을 제거한다.|
|print()|값들을 순서대로 출력한다.|

사용법과 동작 방식은 다음과 같다.
```py
l = SinglyLinkedList(); l.print()
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
노드는 `하나의 값을 보관하는 변수`와 `다음 노드를 가리키는 변수`를 가지는 클래스다. 다음과 같이 정의한다.
```py
# 노드라는 이름의 클래스를 정의한다.
class Node:
  # 매개변수명 뒤의 값은 기본값을 의미한다.
  def __init__(self, value = None, next = None):
    self.value = value  # 값을 보관한다.
    self.next = next    # 다음 노드를 가리킨다.
```
링크드 리스트는 보관할 값의 개수만큼 위 노드 클래스를 값의 개수만큼 생성하고 연결해 여러 개의 값들을 관리한다.

### 해드 노드
`해드` 노드는 리스트의 시작점을 관리하기 위한 노드다. `해드`는 값을 가지지 않으며 항상 리스트의 첫 번째 값을 가지는 노드를 가리킨다. 리스트에 값이 없으면 노드도 없으므로 단순히 구현의 편의를 위한 노드다. 다음과 같이 생성한다.
```py
head = Node() # 해드용 노드를 생성해 head 라는 이름의 변수로 참조한다.
```

### 뒤에 값을 추가하는 방법
링크드 리스트는 노드들을 연결해 값들을 관리하므로, `해드`에 연결된 노드들을 `next` 변수로 따라가서 마지막 노드를 찾는다. 마지막 노드의 다음 노드를 새 노드로 설정한다.
```py
head.next = Node(1)           # 값이 1인 노드를 생성해 뒤에 추가한다.
head.next.next = Node(2)      # 값이 2인 노드를 생성해 뒤에 추가한다.
head.next.next.next = Node(3) # 값이 3인 노드를 생성해 뒤에 추가한다.

# 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != None:
  print(f'{node.value:3}', end='')
  node = node.next
print()
```
* 실행 결과
```py
  1  2  3

```

### 앞에 값을 추가하는 방법
새 노드의 다음 노드를 첫 번째 값 노드로 설정하고, `해드`의 다음 노드를 새 노드로 설정한다.
```py
head.next = Node(4, head.next)  # 값이 4인 노드를 생성해 앞에 추가한다.
head.next = Node(5, head.next)  # 값이 5인 노드를 생성해 앞에 추가한다.
head.next = Node(6, head.next)  # 값이 6인 노드를 생성해 앞에 추가한다.

# 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != None:
  print(f'{node.value:3}', end='')
  node = node.next
print()
```
* 실행 결과
```py
  6  5  4  1  2  3

```

### 앞의 값을 제거하는 방법
`해드`의 다음 노드를 첫 번째 값 노드의 다음 노드로 설정한다.
```py
head.next = head.next.next  # 값이 6인 노드의 연결을 끊었다.
head.next = head.next.next  # 값이 5인 노드의 연결을 끊었다.
head.next = head.next.next  # 값이 4인 노드의 연결을 끊었다.

# 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != None:
  print(f'{node.value:3}', end='')
  node = node.next
print()
```
* 실행 결과
```py
  1  2  3

```

### 뒤의 값을 제거하는 방법
끝에서 두 번째 노드의 다음 노드를 `None`으로 설정한다.
```py
head.next.next.next = None  # 값이 3인 노드의 연결을 끊었다.
head.next.next = None       # 값이 2인 노드의 연결을 끊었다.
head.next = None            # 값이 1인 노드의 연결을 끊었다.

# 해드로부터 연결된 노드들을 하나씩 따라가며 각 노드의 값을 출력하면 다음과 같다.
node = head.next
while node != None:
  print(f'{node.value:3}', end='')
  node = node.next
print()
```
* 실행 결과
```py

```

### 구현하기
```py
class Node:
  def __init__(self, value = None, next = None):
    self.value = value
    self.next = next

class SinglyLinkedList:
  def __init__(self):
    self.head = Node()

l = SinglyLinkedList()
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
