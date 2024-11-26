class PriorityQueue:
  def __init__(self):
    self.length = 0
    self.a = [0 for _ in range(10)]

  # 0번 인덱스를 사용할 때
  # 부모 = (index - 1) // 2
  # 왼쪽 자식 = index * 2 + 1
  # 오른쪽 자식 = index * 2 + 2
  # 마지막 부모 노드 = [0, (length - 2) // 2 + 1)

  # 0번 인덱스를 사용하지 않을 때
  # 부모 = index // 2
  # 왼쪽 자식 = index * 2
  # 오른쪽 자식 = index * 2 + 1
  # 마지막 부모 노드 = [1, (length - 2) // 2 + 2)

  # 새 값을 마지막 노드로 추가하고 올리면서 정렬
  def push(self, value):
    self.a[self.length] = value
    self.length += 1
    c = self.length - 1
    p = (c - 1) // 2
    while p >= 0 and self.a[p] < self.a[c]:
      self.a[p], self.a[c] = self.a[c], self.a[p]
      c = p
      p = (c - 1) // 2

  # 마지막 노드에 있는 값을 루트에 올린 후 내리면서 정렬
  def pop(self):
    v  = self.a[0]
    self.length -= 1
    if self.length == 0: return v

    self.a[0] = self.a[self.length]
    p = 0
    while True:
      c = p
      l = p * 2 + 1
      r = p * 2 + 2
      if l < self.length and self.a[c] < self.a[l]: c = l
      if r < self.length and self.a[c] < self.a[r]: c = r
      if c == p: break
      self.a[c], self.a[p] = self.a[p], self.a[c]
      p = c
    return v

  def print(self):
    print('[', end='')
    if self.length != 0:
      print(self.a[0], end='')
    for i in range(1, self.length):
      print('', self.a[i], end='')
    print(']')

  def length(self):
    return self.length

q = PriorityQueue() # PriorityQueue 클래스의 인스턴스를 생성한다.
q.push(5)           # 힙에 숫자 5를 추가한다.
q.push(1)           # 힙에 숫자 1을 추가한다.
q.push(4)           # 힙에 숫자 4를 추가한다.
q.push(9)           # 힙에 숫자 9를 추가한다
print(q.pop())      # 힙에서 가장 큰 값인 9를 반환한다.
print(q.pop())      # 힙에서 가장 큰 값인 5를 반환한다.
print(q.pop())      # 힙에서 가장 큰 값인 4를 반환한다.
print(q.pop())      # 힙에서 가장 큰 값인 1을 반환한다.
