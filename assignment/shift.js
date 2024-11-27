// 순서 바꾸기 기준 답안

const data = [1, 2, 3]
const selected = [1]

function leftShift (data, selected) {
  const set = new Set(selected)
  for (let i = 1; i < data.length; i++) {
    if (!set.has(data[i])) continue
    if (set.has(data[i - 1])) continue
    [data[i], data[i - 1]] = [data[i - 1], data[i]]
  }
}
leftShift(data, selected)
console.log(data)

const testSuite = [
  { data: [1, 2, 3], selected: [1], expect: [1, 2, 3] },
  { data: [1, 2, 3], selected: [2], expect: [2, 1, 3] },
  { data: [1, 2, 3], selected: [3], expect: [1, 3, 2] },
  { data: [1, 2, 3], selected: [1, 2], expect: [1, 2, 3] },
  { data: [1, 2, 3], selected: [2, 1], expect: [1, 2, 3] },
  { data: [1, 2, 3], selected: [1, 3], expect: [1, 3, 2] },
  { data: [1, 2, 3], selected: [3, 1], expect: [1, 3, 2] },
  { data: [1, 2, 3], selected: [2, 3], expect: [2, 3, 1] },
  { data: [1, 2, 3], selected: [3, 2], expect: [2, 3, 1] },
  { data: [1, 2, 3], selected: [1, 2, 3], expect: [1, 2, 3] }
]
for (const { data, selected, expect } of testSuite) {
  leftShift(data, selected)
  console.assert(JSON.stringify(data) === JSON.stringify(expect), data, selected, expect)
}
