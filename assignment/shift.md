# 순서 바꾸기

```js
/**
 * selected 배열에 포함된 data 배열의 원소들을 왼쪽으로 한 칸씩 옴기는 콘솔 프로그램을 작성해주세요.
 *
 * 예) data = [1, 2, 3], selected = [1],       data' = [1, 2, 3]
 * 예) data = [1, 2, 3], selected = [2],       data' = [2, 1, 3]
 * 예) data = [1, 2, 3], selected = [3],       data' = [1, 3, 2]
 * 예) data = [1, 2, 3], selected = [1, 2],    data' = [1, 2, 3]
 * 예) data = [1, 2, 3], selected = [2, 1],    data' = [1, 2, 3]
 * 예) data = [1, 2, 3], selected = [1, 3],    data' = [1, 3, 2]
 * 예) data = [1, 2, 3], selected = [3, 1],    data' = [1, 3, 2]
 * 예) data = [1, 2, 3], selected = [2, 3],    data' = [2, 3, 1]
 * 예) data = [1, 2, 3], selected = [3, 2],    data' = [2, 3, 1]
 * 예) data = [1, 2, 3], selected = [1, 2, 3], data' = [1, 2, 3]
 *
 * 입력값에 오류는 없다고 가정합니다.
 *
 * selected는 data의 부분집합 입니다.
 *
 * 언어는 자바스크립트나 타입스크립트 모두 무방합니다.
 */

const data = [1, 2, 3]
const selected = [1]

// 아래에 코드를 작성해주세요.

console.log(data)
```

다음과 같은 화면에서 순서 올리기 기능입니다.

```jsx
 노출 순서 변경                          [순서 올리기 버튼]   [순서 내리기 버튼]
---------------------------------------------------------------------------------
 선택 | 노출 순서 | 노출 여부 | 글 제목                              | 작성 일자
---------------------------------------------------------------------------------
 [ ]  |     1     |   노출    | 여기는 둘이 함께ㅠㅠ                 |  24.10.24
---------------------------------------------------------------------------------
 [✔]  |     2     |   노출    | [방꾸] 청량여름 맥시멈🌊🍃🌻         |  24.10.24
---------------------------------------------------------------------------------
 [✔]  |     3     |   노출    | 솔직히 방꾸 현질은 개호구지ㅋㅋ      |  24.10.24
---------------------------------------------------------------------------------
 [ ]  |     4     |   노출    | 운영진 마이룸ㅋㅋㅋㅋㅋㅋㅋㅋ        |  24.10.24
---------------------------------------------------------------------------------
 [ ]  |     5     |   노출    | 냥덕 마이룸 현질했어ㅋㅋ             |  24.10.24
---------------------------------------------------------------------------------
```
