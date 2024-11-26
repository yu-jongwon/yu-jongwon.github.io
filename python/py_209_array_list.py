class ArrayList:
  def __init__(self):
    self.a = [None]
    self.length = 0

  def grow(self):
    if self.length < len(self.a): return
    temp = self.a
    self.a = [None] * len(self.a) * 2
    for i in range(self.length):
      self.a[i] = temp[i]

  def push_front(self, value):
    self.grow()
    for i in range(self.length, 0, -1):
      self.a[i] = self.a[i - 1]
    self.a[0] = value
    self.length += 1

  def push_back(self, value):
    self.grow()
    self.a[self.length] = value
    self.length += 1

  def pop_front(self):
    for i in range(self.length - 1):
      self.a[i] = self.a[i + 1]
    self.length -= 1

  def pop_back(self):
    self.length -= 1

  def get(self, index):
    return self.a[index]

  def __str__(self):
    s = '['
    if self.length > 0:
      s += str(self.a[0])
    for i in range(1, self.length):
      s += ', ' + str(self.a[i])
    return s + ']'

  def insert(self, index, value):
    if not (0 <= index <= self.length):
      raise IndexError()
    if self.length == len(self.a):
      temp = [0] * len(self.a) * 2
      for i in range(len(self.a)):
        temp[i] = self.a[i]
      self.a = temp
    for i in range(self.length, index, -1):
      self.a[i] = self.a[i-1]
    self.a[index] = value
    self.length += 1

  def delete(self, index):
    if not (0 <= index < self.length):
      raise IndexError()
    for i in range(index, self.length):
      self.a[i] = self.a[i+1]
    self.length -= 1

  def print(self):
    print(self)

  def __getitem__(self, index):
    if not (0 <= index < self.length):
      raise IndexError()
    return self.a[index]

  def __setitem__(self, index, value):
    if not (0 <= index < self.length):
      raise IndexError()
    self.a[index] = value

  def __len__(self):
    return self.length

l = ArrayList()
l.push_front(1)
l.push_front(2)
l.push_front(3)
l.push_back(4)
l.push_back(5)
l.push_back(6)
l.pop_front()
l.pop_front()
l.pop_back()
l.pop_back()
print(l.get(0))
print(l.get(1))
print(l)
