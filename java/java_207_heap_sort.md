> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [힙 정렬 (Heap Sort)](#힙-정렬-heap-sort)
    - [트리](#트리)
    - [힙](#힙)
    - [힙으로 정렬하는 방법](#힙으로-정렬하는-방법)
    - [힙을 구성하는 방법](#힙을-구성하는-방법)
    - [가장 큰 값을 정렬하는 과정](#가장-큰-값을-정렬하는-과정)
    - [두 번째로 큰 값을 정렬하는 과정](#두-번째로-큰-값을-정렬하는-과정)
    - [세 번째로 큰 값을 정렬하는 과정](#세-번째로-큰-값을-정렬하는-과정)
    - [네 번째로 큰 값을 정렬하는 과정](#네-번째로-큰-값을-정렬하는-과정)
    - [다섯 번째로 큰 값을 정렬하는 과정](#다섯-번째로-큰-값을-정렬하는-과정)
    - [여섯 번쨰로 큰 값을 정렬하는 과정](#여섯-번쨰로-큰-값을-정렬하는-과정)
    - [일곱 번쨰로 큰 값을 정렬하는 과정](#일곱-번쨰로-큰-값을-정렬하는-과정)
    - [구현하기](#구현하기)

<!-- /code_chunk_output -->

# 힙 정렬 (Heap Sort)
다음과 같이 정렬되지 않은 배열이 있다.
```py
[2, 0, 1, 5, 6, 4, 3]
```
다음과 같이 숫자들을 오름차순으로 정렬하는 것이 목표다.
```py
[0, 1, 2, 3, 4, 5, 6]
```

### 트리
다음과 같은 배열이 있다.
```py
[2, 0, 1, 5, 6, 4, 3]
```
배열의 값들을 트리라고 하는 자료구조로 표현하면 다음과 같다.
```py
        2
      /   \
    0       1
   / \     / \
  5   6   4   3
```
* 선으로 연결된 각각의 값들을 `노드`라고 한다.
* 첫 번째 노드를 `루트`라고 한다.
* 노드들은 `부모`와 `자식` 관계를 가진다.
* 선으로 연결된 위쪽의 값이 부모고, 아래쪽의 두 값이 자식이다.
* 2는 0과 1의 부모고, 0과 1은 2의 자식이다.
* 0은 5와 6의 부모고, 5와 6은 0의 자식이다.
* 1은 4와 3의 부모고, 4와 3은 1의 자식이다.
* 자식은 최대 두 개가 있을 수 있다. `왼쪽 자식`과 `오른쪽 자식`이라고 한다.
* 자식은 왼쪽 자식부터 채워진다. 다시 말해 오른쪽 자식만 있을 수는 없다.
* 배열의 값 대신 인덱스로 표현하면 다음과 같다.
```py
       [0]
      /   \
   [1]     [2]
   / \     / \
 [3] [4] [5] [6]
```
* 배열을 사용해 트리를 표현하므로 다음과 같은 규칙이 성립된다.

|설명|식|
|-|-|
|마지막 부모의 인덱스|length / 2 - 1|
|부모의 인덱스|(index - 1) / 2|
|왼쪽 자식의 인덱스|index * 2 + 1|
|오른쪽 자식의 인덱스|index * 2 + 2|

### 힙
값들을 어떤 조건에 따라 정렬된 상태로 유지하는 자료구조를 힙이라고 한다. 힙은 트리라는 자료구조로 표현한다. 다음과 같은 트리가 있다.
```py
        2
      /   \
    0       1
   / \     / \
  5   6   4   3
```
부모가 자식보다 큰 값을 가지도록 힙을 구성하면 다음과 같다.
```py
        6
      /   \
    5       4
   / \     / \
  2   0   1   3
```
위와 같이 정렬된 트리를 `최대힙`이라고 한다. 부모가 자식보다 큰 값을 가지므로, 루트에는 가장 큰 값이 위치한다.

### 힙으로 정렬하는 방법
최대힙에서는 가장 큰 값이 루트에 위치한다. 힙은 배열로 표현되므로 인덱스 `0`에 가장 큰 값이 위치한다. 인덱스 `0`의 값을 마지막 인덱스의 값과 교환하면 가장 큰 값이 정렬된다. 교환 후에는 힙이 깨지므로, 힙을 다시 구성해 교환하는 것을 반복하면 배열의 값들이 오름차순으로 정렬된다.

### 힙을 구성하는 방법
마지막 부모 노드부터 루트 노드까지의 순서로, 부모 노드의 값을 두 자식 중 큰 값과 교환하면 힙이 구성된다.

### 가장 큰 값을 정렬하는 과정
```py
[2, 0, 1, 5, 6, 4, 3] # 초기 상태
        2
      /   \
    0       1
   / \     / \
  5   6   4   3

[2, 0, 4, 5, 6, 1, 3] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        2
      /   \
    0       4
   / \     / \
  5   6   1   3

[2, 6, 4, 5, 0, 1, 3] # 두 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        2
      /   \
    6       4
   / \     / \
  5   0   1   3

[6, 2, 4, 5, 0, 1, 3] # 첫 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        6
      /   \
    2       4
   / \     / \
  5   0   1   3

[6, 5, 4, 2, 0, 1, 3] # 힙을 구성하기 위해 값이 바뀐 두 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        6
      /   \
    5       4
   / \     / \
  2   0   1   3

[3, 5, 4, 2, 0, 1, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        3
      /   \
    5       4
   / \     /
  2   0   1
```

### 두 번째로 큰 값을 정렬하는 과정
```py
[3, 5, 4, 2, 0, 1, 6] # 가장 큰 값이 정렬된 상태에서 시작한다.
        3
      /   \
    5       4
   / \     /
  2   0   1

[3, 5, 4, 2, 0, 1, 6] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        3
      /   \
    5       4
   / \     /
  2   0   1

[3, 5, 4, 2, 0, 1, 6] # 두 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        3
      /   \
    5       4
   / \     /
  2   0   1

[5, 3, 4, 2, 0, 1, 6] # 첫 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        5
      /   \
    3       4
   / \     /
  2   0   1

[1, 3, 4, 2, 0, 5, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        1
      /   \
    3       4
   / \
  2   0
```

### 세 번째로 큰 값을 정렬하는 과정
```py
[1, 3, 4, 2, 0, 5, 6] # 두 번째로 큰 값이 정렬된 상태에서 시작한다.
        1
      /   \
    3       4
   / \
  2   0

[1, 3, 4, 2, 0, 5, 6] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        1
      /   \
    3       4
   / \
  2   0

[4, 3, 1, 2, 0, 5, 6] # 첫 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        4
      /   \
    3       1
   / \
  2   0

[0, 3, 1, 2, 4, 5, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        0
      /   \
    3       1
   /
  2
```

### 네 번째로 큰 값을 정렬하는 과정
```py
[0, 3, 1, 2, 4, 5, 6] # 세 번째로 큰 값이 정렬된 상태에서 시작한다.
        0
      /   \
    3       1
   /
  2

[0, 3, 1, 2, 4, 5, 6] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        0
      /   \
    3       1
   /
  2

[3, 0, 1, 2, 4, 5, 6] # 첫 번째 부모 노드를 두 자식 중 큰 값과 교환했다.
        3
      /   \
    0       1
   /
  2

[2, 0, 1, 3, 4, 5, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        2
      /   \
    0       1
```

### 다섯 번째로 큰 값을 정렬하는 과정
```py
[2, 0, 1, 3, 4, 5, 6] # 네 번째로 큰 값이 정렬된 상태에서 시작한다.
        2
      /   \
    0       1

[2, 0, 1, 3, 4, 5, 6] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        2
      /   \
    0       1

[1, 0, 2, 3, 4, 5, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        1
      /
    0
```

### 여섯 번쨰로 큰 값을 정렬하는 과정
```py
[1, 0, 2, 3, 4, 5, 6] # 다섯 번째로 큰 값이 정렬된 상태에서 시작한다.
        1
      /
    0

[1, 0, 2, 3, 4, 5, 6] # 마지막 부모 노드를 두 자식 중 큰 값과 교환했다.
        1
      /
    0

[0, 1, 2, 3, 4, 5, 6] # 루트 노드를 마지막 노드와 교환해 정렬하고 힙에서 제외했다.
        0
```

### 일곱 번쨰로 큰 값을 정렬하는 과정
숫자 하나는 비교 대상이 없으므로 정렬하지 않는다.

### 구현하기
```java
import java.util.Arrays;
import java.util.Collections;

class HeapSort {
  public static void main(String[] args) {
    var n = 7;
    var a = new Integer[n];
    for (var i = 0; i < n; i++) {
      a[i] = i;
    }
    Collections.shuffle(Arrays.asList(a));

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();

    // 여기에 알고리즘을 작성하자.

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
```