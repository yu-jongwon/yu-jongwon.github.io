> Python by 유종원
> 수정 및 배포, 상업적 사용을 금지합니다.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [퀵 셀렉트 (Quick Select)](#퀵-셀렉트-quick-select)
    - [정렬된 배열에서의 k 번째 큰 수나 작은 수](#정렬된-배열에서의-k-번째-큰-수나-작은-수)
    - [가장 큰 수를 찾는 과정](#가장-큰-수를-찾는-과정)
    - [마지막 수를 기준으로 정렬하는 과정](#마지막-수를-기준으로-정렬하는-과정)
    - [구현하기](#구현하기)

<!-- /code_chunk_output -->

# 퀵 셀렉트 (Quick Select)
다음과 같은 정렬되지 않은 배열이 있다.
```py
[18, 17, 0, 13, 7, 11, 2]
```
`퀵 셀렉트`는 배열 전체를 정렬하지 않고, k 번째 큰 수나 작은 수를 찾을 수 있는 알고리즘이다. 예를 들어 가장 큰 수인 18이나 가장 작은 수인 0, 혹은 두 번째로 큰 수인 17이나 두 번째로 작은 수인 2 등을 찾을 수 있다.

### 정렬된 배열에서의 k 번째 큰 수나 작은 수
다음과 같이 정렬된 배열이 있다.
```py
[0, 2, 7, 11, 13, 17, 18]
```
가장 작은 수 `0`은 인덱스 `0`에 위치하고, 두 번쨰로 작은 수 `2`는 인덱스 `1`에 위치하고, 가장 큰 수 `18`은 인덱스 `n-1`에 위치하고, 두 번째로 큰 수 `17`은 인덱스 `n-2`에 위치한다. 정렬된 상태에서는 k 번쨰 큰 수나 작은 수에 바로 접근할 수 있다.

### 가장 큰 수를 찾는 과정
배열의 길이가 `7`이므로 숫자들이 정렬되어 있었다면 가장 큰 수는 마지막 인덱스 `6`에 위치할테다. 숫자를 하나씩 정렬해가며 정렬된 숫자의 인덱스가 `6`일 때까지 검색을 계속한다. 인덱스 `0`부터 `6`의 범위에서 마지막 숫자 `2`를 기준으로 삼는다. 기준 수보다 작은 수는 왼쪽에 큰 수는 오른쪽에 배열해 기준 수 `2` 정렬한다.
```py
[18, 17, 0, 13, 7, 11, 2] # 기준 수 2, 기준 수 정렬
[0] 2 [18, 13, 7, 11, 17]
```
> 만약 두 번쨰로 작은 수를 찾는 것이었다면, 인덱스 1에 위치할 테므로 정렬한 숫자 2를 반환하며 검색을 종료한다.

찾는 수의 정렬될 위치는 인덱스 `6`이므로, 앞에서 정렬한 숫자 `2`의 인덱스인 `1`의 오른쪽을 대상으로 검색을 계속한다. 인덱스 `2`부터 `6`의 범위에서 마지막 숫자 `17`을 기준으로 삼는다. 기준 수보다 작은 수는 왼쪽에 큰 수는 오른쪽에 배열해 기준 수 `17` 정렬한다.
```py
      [18, 13, 7, 11, 17] # 기준 수 17, 기준 수 정렬
      [13, 7, 11] 17 [18]
```
> 만약 두 번쨰로 큰 수를 찾는 것이었다면, 인덱스 5에 위치할 테므로 정렬한 숫자 17을 반환하며 검색을 종료한다.

찾는 수의 정렬될 위치는 인덱스 `6`이므로, 앞에서 정렬한 숫자 `17`의 인덱스인 `5`의 오른쪽을 대상으로 검색을 계속한다. 인덱스 `6`부터 `6`의 범위에서 마지막 숫자 `18`을 기준으로 삼는다. 기준 수보다 작은 수는 왼쪽에 큰 수는 오른쪽에 배열해 기준 수 `18` 정렬한다.
```py
                     [18] # 기준 수 18, 기준 수 정렬
                      18
```
정렬된 숫자의 인덱스가 `6`이고, 찾는 수의 정렬될 위치 또한 인덱스 `6`이므로 숫자 `18`을 반환하며 검색을 종료한다.

### 마지막 수를 기준으로 정렬하는 과정
* `i`는 현재 수, `j`는 기준 수 보다 큰 수를 가리킨다.
* `i`와 `j` 모두 해당 범위의 가장 낮은 인덱스에서 시작한다.
* `i`가 가리키는 수가 기준 수 보다 작으면 `j`가 가리키는 수와 교환하고, `j`를 1만큼 증가시킨다.
* `i`가 가리키는 수가 기준 수가 되면 `j`가 가리키는 수와 교환해 기준 수를 정렬한다.

```py
[18, 17, 0, 13, 7, 11, 2] # i=0, j=0, 기준 수 2
[18, 17, 0, 13, 7, 11, 2] # i=1, j=0
[0, 17, 18, 13, 7, 11, 2] # i=2, j=0, 교환
[0, 17, 18, 13, 7, 11, 2] # i=3, j=1
[0, 17, 18, 13, 7, 11, 2] # i=4, j=1
[0, 17, 18, 13, 7, 11, 2] # i=5, j=1
[0, 17, 18, 13, 7, 11, 2] # i=6, j=1, 기준 수 정렬
[0] 2 [18, 13, 7, 11, 17]

      [18, 13, 7, 11, 17] # i=2, j=2, 기준수 17
      [13, 18, 7, 11, 17] # i=3, j=2, 교환
      [13, 7, 18, 11, 17] # i=4, j=3, 교환
      [13, 7, 11, 18, 17] # i=5, j=4, 교환
      [13, 7, 11, 18, 17] # i=6, j=5, 기준 수 정렬
      [13, 7, 11] 17 [18]

                     [18] # i=6, i=6, 기준 수 18, 기준 수 정렬
                      18
```

### 구현하기
```py
import random

n = 7
a = [random.randrange(30) for _ in range(n)]
random.shuffle(a)
print(a)

k = n - 1
low = 0
high = n - 1
# 여기에 알고리즘을 작성하자.

print(a[k])
```