> Python by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [바이너리 서치 트리 (Binary Search Tree)](#바이너리-서치-트리-binary-search-tree)
    - [개요](#개요)
    - [노드](#노드)
    - [값을 추가하는 방법](#값을-추가하는-방법)
    - [자식이 없는 노드를 제거하는 방법](#자식이-없는-노드를-제거하는-방법)
    - [자식이 하나인 노드를 제거하는 방법](#자식이-하나인-노드를-제거하는-방법)
    - [자식이 둘인 노드를 제거하는 방법](#자식이-둘인-노드를-제거하는-방법)
    - [트리를 출력하는 방법](#트리를-출력하는-방법)
    - [구현하기](#구현하기)
    - [구현할 메서드 목록](#구현할-메서드-목록)

<!-- /code_chunk_output -->

# 바이너리 서치 트리 (Binary Search Tree)
다음과 같은 무작위의 숫자들이 있다.
```py
18 17 0 13 7 11 2
```
위와 같은 숫자들을 배열이나 리스트와 같은 선형 자료구조로 관리하면, 어떤 값을 찾기 위해 모든 값들을 한번씩 확인해야 한다. `바이너리 서치 트리`는 어떤 값을 찾기 위해 모든 값들을 확인할 필요가 없도록 다음과 같은 트리 구조를 사용한다.
```py
       11
      /  \
    2     17
   / \    / \
  0   7 13  18
```
위 트리 구조의 특징은 다음과 같다.
* 하나의 노드는 최대 두 개의 자식을 가질 수 있다.
* 자식은 왼쪽만 있을 수도 있고, 오른쪽만 있을 수도 있고, 양쪽 모두가 있을 수도 있다.
* 왼쪽 자식의 값은 부모보다 작고, 오른쪽 자식의 값은 부모보다 크다.

이런 특징으로 인해 위 트리에서는 어떤 값을 찾더라도 비교 횟수가 최대 세 번을 넘어가지 않는다. `0`을 찾을 때에는 `11` `2` `0` 순으로 비교하고, `7`을 찾을 때에는 `11` `2` `7` 순으로 비교하고, `13`을 찾을 때에는 `11` `17` `13` 순으로 비교하고, `18`을 찾을 때에는 `11` `17` `18` 순으로 비교해 값을 찾을 수 있다.

### 개요
`BinarySearchTree`라는 이름의 클래스를 만드는 것이 목표다. 다음은 클래스의 주요 메서드다.
|메서드|설명|
|-|-|
|push()|값을 추가한다.|
|pop()|값이 있는지 확인한다.|

사용법과 동작 방식은 다음과 같다.
```py
t = BinarySearchTree()
t.push(2)
t.push(4)
t.push(3)
t.push(7)
t.push(5)
t.push(8)
t.push(6)
t.print()
print()
t.pop(4)
t.print()
```
* 실행 결과
```py
                               2
               .                               4
       .               .               3               7
   .       .       .       .       .       .       5       8
 .   .   .   .   .   .   .   .   .   .   .   .   .   6   .   .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

               2
       .               5
   .       .       3       7
 .   .   .   .   .   .   6   8
. . . . . . . . . . . . . . . .
```
`.`은 해당 위치에 노드가 없음을 의미한다.

### 노드
바이너리 서치 트리에서의 노드는 `하나의 값을 보관하는 변수`와 `왼쪽 자식 노드를 가리키는 변수`, `오른쪽 자식 노드를 가리키는 변수`를 가지는 클래스다. 다음과 같이 정의한다.
```py
# 노드라는 이름의 클래스를 정의한다.
class Node:
  def __init__(self, value, left = None, right = None):
    self.value = value  # 값을 보관한다.
    self.left = left    # 왼쪽 자식 노드를 가리킨다.
    self.right = right  # 오른쪽 자식 노드를 가리킨다.
```

### 값을 추가하는 방법
* 최상단 노드인 루트 노드가 없는 경우에는 root 변수에 직접 노드를 설정한다.
* 루트 노드의 값부터 비교를 시작해 추가할 값이 대상 노드보다 작다면 왼쪽 자식 노드와 비교를 반복하고, 크다면 오른쪽 자식 노드와 비교를 반복한다.
* 비교할 자식 노드가 없다면 추가할 값을 가지는 노드를 생성해 자식으로 설정한다.
```py
root = None # None을 값으로 하는 root라는 이름의 변수를 선언한다.

# 트리에 숫자 4를 추가한다.
# 루트 노드가 없는 경우에는 root 변수에 직접 노드를 설정한다.
root = Node(4)
        4

# 트리에 숫자 2를 추가한다.
# 숫자 2는 숫자 4보다 작으므로 값이 4인 노드의 왼쪽 자식이 된다.
root.left = Node(2)
        4
      /
    2

# 트리에 숫자 6을 추가한다.
# 숫자 6은 숫자 4보다 크므로 값이 4인 노드의 오른쪽 자식이 된다.
root.right = Node(6)
        4
      /   \
    2       6

# 트리에 숫자 1을 추가한다.
# 숫자 1은 4보다 작고 2보다 작으므로 값이 2인 노드의 왼쪽 자식이 된다.
root.left.left = Node(1)
        4
      /   \
    2       6
   /
  1

# 트리에 숫자 3을 추가한다.
# 숫자 3은 4보다 작고 2보다 크므로 값이 2인 노드의 오른쪽 자식이 된다.
root.left.right = Node(3)
        4
      /   \
    2       6
   / \
  1   3

# 트리에 숫자 5를 추가한다.
# 숫자 5는 4보다 크고 6보다 작으므로 값이 6인 노드의 왼쪽 자식이 된다.
root.right.left = Node(5)
        4
      /   \
    2       6
   / \     /
  1   3   5

# 트리에 숫자 7을 추가한다.
# 숫자 7은 4보다 크고 6보다 크므로 값이 6인 노드의 오른쪽 자식이 된다.
root.right.right = Node(7)
        4
      /   \
    2       6
   / \     / \
  1   3   5   7
```

### 자식이 없는 노드를 제거하는 방법
제거하려는 값을 가진 노드에 자식이 없는 경우, 제거할 노드의 부모가 제거할 노드 대신 `None`을 가리키도록 한다.
```py
# 초기 상태
        4
      /   \
    2       6
   / \     / \
  1   3   5   7

# 값이 7인 노드를 제거한다.
# 값이 6인 노드의 오른쪽 노드를 None으로 설정한다.
root.right.right = None
        4
      /   \
    2       6
   / \     /
  1   3   5

# 값이 1인 노드를 제거한다.
# 값이 2인 노드의 왼쪽 노드를 None으로 설정한다.
root.left.left = None
        4
      /   \
    2       6
     \     /
      3   5
```

### 자식이 하나인 노드를 제거하는 방법
제거하려는 값을 가진 노드에 자식이 하나만 있는 경우, 제거할 노드의 부모가 제거할 노드 대신 제거할 노드의 자식을 가리키도록 한다.
```py
# 초기 상태
        4
      /   \
    2       6
     \     /
      3   5

# 값이 2인 노드를 제거한다.
# 값이 4인 노드의 왼쪽 노드를 값이 3인 노드로 설정한다.
root.left = root.left.right
        4
      /   \
    3       6
           /
          5

# 값이 6인 노드를 제거한다.
# 값이 4인 노드의 오른쪽 노드를 값이 5인 노드로 설정한다.
root.right = root.right.left
        4
      /   \
    3       5
```

### 자식이 둘인 노드를 제거하는 방법
제거하려는 값을 가진 노드에 자식이 둘 모두 있는 경우, 제거할 노드의 오른쪽에서 가장 왼쪽에 있는 노드를 노드를 제거한 후, 제거할 노드를 대체하도록 한다. 제거할 노드의 오른쪽에서 가장 왼쪽에 있는 노드의 값은 제거하려는 값보다 큰 값 중 가장 작은 값이다.
```py
# 초기 상태
root = Node(2,
  None, Node(4,
    Node(3), Node(7,
      Node(5,
        None, Node(6)),
      Node(8),
    )
  )
)
    2
      \
        4
      /   \
    3       7
           / \
          5   8
           \
            6

# 값이 4인 노드를 제거하려고 한다.
# 오른쪽에서 가장 왼쪽에 있는 값이 5인 노드를 제거한다.
successor = root.right.right.left
root.right.right.left = successor.right
    2
      \
        4
      /   \
    3       7
           / \
          6   8

# 값이 4인 노드를 제거한다.
# 값이 4인 노드를 앞서 제거한 값이 5인 노드로 대체한다.
successor.left = root.right.left
successor.right = root.right.right
root.right = successor
    2
      \
        5
      /   \
    3       7
           / \
          6   8
```

### 트리를 출력하는 방법
다음 코드를 사용해 트리를 보기 좋게 출력할 수 있다.
```py
def print_pretty(root):
  l = [[root]]
  while l[-1].count(None) != len(l[-1]):
    l.append([None for _ in range(len(l[-1]) * 2)])
    for i in range(len(l[-2])):
      if l[-2][i] == None: continue
      l[-1][i*2] = l[-2][i].left
      l[-1][i*2+1] = l[-2][i].right
  w = 2 ** len(l)
  for l in l:
    for node in l:
      if node == None:
        print(f'{".":^{w}}', end='')
      else:
        print(f'{node.value:^{w}}', end='')
    w //= 2
    print()
```
다음과 같이 트리를 구성하고 루트 노드로 위 함수를 호출하면,
```py
root = Node(4,
  Node(2, Node(1), Node(3)),
  Node(6, Node(5), Node(7)),
)
print_pretty(root)
```
다음과 같이 출력된다.
```py
       4
   2       6
 1   3   5   7
. . . . . . . .

```

### 구현하기
```py
class Node:
  def __init__(self, value, left = None, right = None):
    self.value = value
    self.left = left
    self.right = right

class BinarySearchTree:
  def __init__(self):
    self.root = None

t = BinarySearchTree()
```

### 구현할 메서드 목록
클래스에 다음 메서드들을 정의하고 기능을 구현하자.
|메서드|동작|
|-|-|
|push(value)|값이 value인 노드를 트리에 추가|
|pop(value)|value와 같은 값을 가진 노드를 찾아 제거|
|search(value)|value와 같은 값을 가진 노드가 있는지 여부 반환|
|empty()|값이 있는지 여부 반환|
|length()|값의 개수 반환|
|clear()|초기화|
|print()|값들을 트리 형태로 출력|