> Java by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [병합 정렬 (Merge Sort)](#병합-정렬-merge-sort)
    - [개요](#개요)
    - [나누는 과정](#나누는-과정)
    - [정렬하며 합치는 과정](#정렬하며-합치는-과정)
    - [정렬된 두 배열을 정렬하며 합치는 과정](#정렬된-두-배열을-정렬하며-합치는-과정)
    - [구현하기](#구현하기)

<!-- /code_chunk_output -->

# 병합 정렬 (Merge Sort)
다음과 같이 정렬되지 않은 배열이 있다.
```py
[5, 2, 3, 0, 6, 4, 1]
```
다음과 같이 숫자들을 오름차순으로 정렬하는 것이 목표다.
```py
[0, 1, 2, 3, 4, 5, 6]
```

### 개요
숫자 개수가 하나 이하가 될 때까지 반으로 나누고, 반으로 나눠진 숫자들을 되돌아가면서 정렬하며 합친다.

* 단계별
```py
[5, 2, 3, 0, 6, 4, 1]   # 정렬 전 배열 상태
[5, 2, 3, 0][6, 4, 1]   # 나누기
[5, 2][3, 0][6, 4][1][] # 나누기
[5][2][3][0][6][4][1]   # 나누기
[2, 5][0, 3][4, 6][1]   # 정렬하며 합치기
[0, 2, 3, 5][1, 4, 6]   # 정렬하며 합치기
[0, 1, 2, 3, 4, 5, 6]   # 정렬하며 합치기
[0, 1, 2, 3, 4, 5, 6]   # 정렬 후 배열 상태
```

* 시간순
```py
[5, 2, 3, 0, 6, 4, 1]   # 정렬 전 배열 상태
[5, 2, 3, 0]            # 나누기 (왼쪽)
[5, 2]                  # 나누기 (왼쪽의 왼쪽)
[5]                     # 나누기 (왼쪽의 왼쪽의 왼쪽)
   [2]                  # 나누기 (오른쪽 왼쪽의 오른쪽)
[2, 5]                  # 정렬하며 합치기
      [3, 0]            # 나누기 (왼쪽의 오른쪽)
      [3]               # 나누기 (왼쪽의 오른쪽의 왼쪽)
         [0]            # 나누기 (왼쪽의 오른쪽의 오른쪽)
      [0, 3]            # 정렬하며 합치기
[0, 2, 3, 5]            # 정렬하며 합치기
            [6, 4, 1]   # 나누기 (오른쪽)
            [6, 4]      # 나누기 (오른쪽의 왼쪽)
            [6]         # 나누기 (오른쪽의 왼쪽의 왼쪽)
               [4]      # 나누기 (오른쪽의 왼쪽의 오른쪽)
            [4, 6]      # 정렬하며 합치기
                  [1]   # 나누기 (오른쪽의 오른쪽의 왼쪽)
                     [] # 나누기 (오른쪽의 오른쪽의 오른쪽)
                  [1]   # 정렬하며 합치기
            [1, 4, 6]   # 정렬하며 합치기
[0, 1, 2, 3, 4, 5, 6]   # 정렬하며 합치기
```

### 나누는 과정
가장 낮은 인덱스가 `0`이고 가장 높은 인덱스가 `6`일 때, 중간 인덱스는 `(0 + 6) / 2`의 결과인 `3`이 된다.
```py
[5, 2, 3, 0, 6, 4, 1]   # 0:6
[5, 2, 3, 0]            # 0:3
            [6, 4, 1]   # 4:6
```
가장 낮은 인덱스가 `0`이고 가장 높은 인덱스가 `3`일 때, 중간 인덱스는 `(0 + 3) / 2`의 결과인 `1`이 된다.
```py
[5, 2, 3, 0]            # 0:3
[5, 2]                  # 0:1
      [3, 0]            # 2:3
```
가장 낮은 인덱스가 `0`이고 가장 높은 인덱스가 `1`일 때, 중간 인덱스는 `(0 + 1) / 2`의 결과인 `0`이 된다.
```py
[5, 2]                  # 0:1
[5]                     # 0:0
   [2]                  # 1:1
```
가장 낮은 인덱스가 `2`이고 가장 높은 인덱스가 `3`일 때, 중간 인덱스는 `(2 + 3) / 2`의 결과인 `2`이 된다.
```py
      [3, 0]            # 2:3
      [3]               # 2:2
         [0]            # 3:3
```
가장 낮은 인덱스가 `4`고 가장 높은 인덱스가 `6`일 때, 중간 인덱스는 `(4 + 6) / 2`의 결과인 `5`가 된다.
```py
            [6, 4, 1]   # 4:6
            [6, 4]      # 4:5
                  [1]   # 6:6
```
가장 낮은 인덱스가 `4`고 가장 높은 인덱스가 `5`일 때, 중간 인덱스는 `(4 + 5) / 2`의 결과인 `4`가 된다.
```py
            [6, 4]      # 4:5
            [6]         # 4:4
               [4]      # 5:5
```
가장 낮은 인덱스가 `6`고 가장 높은 인덱스가 `6`일 때, 중간 인덱스는 `(6 + 6) / 2`의 결과인 `6`이 된다.
```py
                  [1]   # 6:6
                  [1]   # 6:6
                     [] # 7:6
```

### 정렬하며 합치는 과정
1. 나눠진 두 범위의 숫자들을 담을 수 있는 크기의 임시 배열을 만든다.
1. 나눠진 두 범위의 숫자들을 차례대로 크기 순으로 비교해 임시 배열에 정렬된 상태로 저장한다.
1. 임시 배열의 숫자들을 원본 배열의 원래 위치에 복사한다.
```py
[5, 2, 3, 0, 6, 4, 1]   # 원본 배열
[5]                     # 0:0
   [2]                  # 1:1
[2, 5]                  # 정렬된 임시 배열
[2, 5, 3, 0, 6, 4, 1]   # 복사된 원본 배열
      [3]               # 2:2
         [0]            # 3:3
      [0, 3]            # 정렬된 임시 배열
[2, 5, 0, 3, 6, 4, 1]   # 복사된 원본 배열
[2, 5]                  # 0:1
      [0, 3]            # 2:3
[0, 2, 3, 5]            # 정렬된 임시 배열
[0, 2, 3, 5, 6, 4, 1]   # 복사된 원본 배열
            [6]         # 4:4
               [4]      # 5:5
            [4, 6]      # 정렬된 임시 배열
[0, 2, 3, 5, 4, 6, 1]   # 복사된 원본 배열
                  [1]   # 6:6
                     [] # 7:6
                  [1]   # 정렬된 임시 배열
[0, 2, 3, 5, 4, 6, 1]   # 복사된 원본 배열
            [4, 6]      # 4:5
                  [1]   # 6:6
            [1, 4, 6]   # 정렬된 임시 배열
[0, 2, 3, 5, 1, 4, 6]   # 복사된 원본 배열
[0, 2, 3, 5]            # 0:3
            [1, 4, 6]   # 4:6
[0, 1, 2, 3, 4, 5, 6]   # 정렬된 임시 배열
[0, 1, 2, 3, 4, 5, 6]   # 복사된 원본 배열
```

### 정렬된 두 배열을 정렬하며 합치는 과정
다음과 같이 각각 정렬된 두 개의 배열과 두 배열의 모든 숫자들을 담을 수 있는 임시 배열이 있다.
```py
[0, 2, 3, 5]          # 배열 1
[1, 4, 6]             # 배열 2
[_, _, _, _, _, _, _] # 임시 배열
```
다음과 같이 임시 배열에 정렬된 상태로 두 배열의 숫자들을 모두 저장하는 과정을 알아보자.
```py
[0, 1, 2, 3, 4, 5, 6]
```
과정은 다음과 같다.
```py
[0, _, _, _, _, _, _] # 0과 1을 비교해 작은 값을 저장한다.
[0, 1, _, _, _, _, _] # 2와 1을 비교해 작은 값을 저장한다.
[0, 1, 2, _, _, _, _] # 2와 4를 비교해 작은 값을 저장한다.
[0, 1, 2, 3, _, _, _] # 3과 4를 비교해 작은 값을 저장한다.
[0, 1, 2, 3, 4, _, _] # 5와 4를 비교해 작은 값을 저장한다.
[0, 1, 2, 3, 4, 5, _] # 5와 6을 비교해 작은 값을 저장한다.
[0, 1, 2, 3, 4, 5, 6] # 6은 비교할 대상이 없으므로 그냥 저장한다.
```

### 구현하기
```java
import java.util.Arrays;
import java.util.Collections;

class MergeSort {
  static void sort(Integer[] a, int low, int high) {
    // System.out.printf("%d %d\n", low, high);
    if (low >= high) return;
    // 배열을 재귀적으로 반으로 나눈다.
    // 임시 배열을 사용하여 두 범위의 숫자들을 정렬하며 합친다.
  }

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

    sort(a, 0, n - 1);

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
```