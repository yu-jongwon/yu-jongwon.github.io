// MBTI 계산기 기준 답안

const questions = [
  { disagree: 'E', agree: 'I', text: '질문 1' },
  { disagree: 'S', agree: 'N', text: '질문 2' },
  { disagree: 'T', agree: 'F', text: '질문 3' },
  { disagree: 'J', agree: 'P', text: '질문 4' },
  { disagree: 'E', agree: 'I', text: '질문 5' },
  { disagree: 'S', agree: 'N', text: '질문 6' },
  { disagree: 'T', agree: 'F', text: '질문 7' },
  { disagree: 'J', agree: 'P', text: '질문 8' }
]

function calc (answers) {
  const score = { I: 0, E: 0, N: 0, S: 0, T: 0, F: 0, P: 0, J: 0 }
  answers.forEach((answer, i) => {
    switch (answer) {
      case 0: score[questions[i].disagree] += 2; break
      case 1: score[questions[i].disagree] += 1; break
      case 3: score[questions[i].agree] += 1; break
      case 4: score[questions[i].agree] += 2; break
    }
  })
  return (score.E >= score.I ? 'E' : 'I') +
         (score.N >= score.S ? 'N' : 'S') +
         (score.F >= score.T ? 'F' : 'T') +
         (score.P >= score.J ? 'P' : 'J')
}
console.log(calc([0, 0, 0, 0, 0, 0, 0, 0]))

const testSuite = [
  { answers: [2, 2, 2, 2, 2, 2, 2, 2], expect: 'ENFP' },
  { answers: [0, 0, 0, 0, 0, 0, 0, 0], expect: 'ESTJ' },
  { answers: [4, 4, 4, 4, 4, 4, 4, 4], expect: 'INFP' },
  { answers: [1, 1, 1, 1, 1, 1, 1, 1], expect: 'ESTJ' },
  { answers: [3, 3, 3, 3, 3, 3, 3, 3], expect: 'INFP' },
  { answers: [3, 3, 3, 3, 1, 1, 1, 1], expect: 'ENFP' },
  { answers: [4, 4, 4, 4, 0, 0, 0, 0], expect: 'ENFP' },
  { answers: [1, 1, 1, 1, 3, 3, 3, 3], expect: 'ENFP' },
  { answers: [0, 0, 0, 0, 4, 4, 4, 4], expect: 'ENFP' },
  { answers: [1, 3, 1, 3, 1, 3, 1, 3], expect: 'ENTP' },
  { answers: [0, 4, 0, 4, 0, 4, 0, 4], expect: 'ENTP' },
  { answers: [3, 1, 3, 1, 3, 1, 1, 1], expect: 'ISFJ' },
  { answers: [4, 0, 4, 0, 4, 0, 0, 0], expect: 'ISFJ' }
]
for (const { answers, expect } of testSuite) {
  console.assert(calc(answers) === expect, answers, expect)
}
