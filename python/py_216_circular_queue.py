class CircularQueue:
  def __init__(self):
    self.values = [None]
    self.size = 1
    self.front = 0
    self.rear = 0
    self.length = 0

  def push(self, value):
    # if self.__full(): self.__grow()
    if self.length == self.size: self.__grow()
    self.values[self.rear] = value
    self.rear = (self.rear + 1) % self.size
    self.length += 1

  def pop(self):
    value = self.values[self.front]
    # self.values[self.front] = None
    self.front = (self.front + 1) % self.size
    self.length -= 1
    return value

  def __grow(self):
    t = [None for _ in range(self.size * 2)]
    # length = self.length()
    for i in range(self.length):
      idx = (self.front + i) % self.size
      t[i] = self.values[idx]
    self.values = t
    self.size *= 2
    self.front = 0
    self.rear = self.length

  def print(self):
    print(self.values)
    for i in range(self.length):
      idx = (self.front + i) % self.size
      print(self.values[idx], end=', ')
    print()

q = CircularQueue()
for i in range(5):
  q.push(i)
  q.print()
print()
print()
for _ in range(3):
  q.pop()
  q.print()
print()
print()
for i in range(5, 12):
  q.push(i)
  q.print()
