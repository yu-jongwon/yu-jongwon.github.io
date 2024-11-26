class Node:
  def __init__(self, key = None, left = None, right = None):
    self.key = key
    self.left = left
    self.right = right
    self.height = 0

class AVLTree:
  def __init__(self):
    self.nil = Node()
    self.root = self.nil

  def search(self, key):
    node = self.root
    while node != self.nil:
      if node.key == key:
        return True
      if node.key > key:
        node = node.left
      if node.key < key:
        node = node.right
    return False

  def push(self, key):
    def f(node):
      if node == self.nil:
        return Node(key, self.nil, self.nil)
      if key < node.key:
        node.left = f(node.left)
        node.height = 1 + max(node.left.height, node.right.height)
        return self.adjust(node)
      if key > node.key:
        node.right = f(node.right)
        node.height = 1 + max(node.left.height, node.right.height)
        return self.adjust(node)
    self.root = f(self.root)

  def pop(self, key):
    def f(node):
      if node == self.nil:
        return self.nil
      if key < node.key:
        node.left = f(node.left)
        node.height = 1 + max(node.left.height, node.right.height)
        return self.adjust(node)
      if key > node.key:
        node.right = f(node.right)
        node.height = 1 + max(node.left.height, node.right.height)
        return self.adjust(node)
      # 자식이 모두 없을 때
      # 삭제 노드를 nil 노드로 대체
      if node.left == self.nil and node.right == self.nil:
        return self.nil
      # 왼쪽 자식이 없을 때
      # 삭제 노드를 오른쪽 노드로 대체
      if node.left == self.nil:
        return node.right
      # 오른쪽 자식이 없을 때
      # 삭제 노드를 왼쪽 노드로 대체
      if node.right == self.nil:
        return node.left
      # 자식이 모두 있고, 오른쪽 자식의 왼쪽 자식이 없을 때
      # 삭제 노드의 왼쪽 노드를 삭제 노드의 오른쪽 노드의 왼쪽 노드로 만들고,
      # 삭제 노드를 오른쪽 노드로 대체
      if node.right.left == self.nil:
        node.right.left = node.left
        node.right.height = 1 + max(node.right.left.height, node.right.right.height)
        return self.adjust(node.right)
      # 자식이 모두 있고, 오른쪽 자식의 왼쪽 자식이 있을 때
      # 삭제 노드의 오른쪽에서 가장 왼쪽의 노드를 제거하고,
      # 삭제 노드를 오른쪽에서 가장 왼쪽의 노드로 대체
      p = node
      c = node.right
      while c.left != self.nil:
        p = c
        c = c.left
      p.left = c.right
      p.height = 1 + max(c.left.height, c.right.height)
      self.adjust(p)
      c.left = node.left
      c.right = node.right
      c.height = 1 + max(c.left.height, c.right.height)
      return self.adjust(c)
    self.root = f(self.root)

  def adjust(self, node):
    def left(node):
      p = node
      c = node.right
      p.right, c.left = c.left, p
      p.height = 1 + max(p.left.height, p.right.height)
      c.height = 1 + max(c.left.height, c.right.height)
      return c
    def right(node):
      p = node
      c = node.left
      p.left, c.right = c.right, p
      p.height = 1 + max(p.left.height, p.right.height)
      c.height = 1 + max(c.left.height, c.right.height)
      return c
    # 왼쪽이 2 이상 깊으면 우회전
    if node.left.height -1 > node.right.height:
      # 좌서브에서 오른쪽이 깊으면 좌버스를 좌회전
      if node.left.left.height < node.left.right.height:
        node.left = left(node.left)
      return right(node)
    # 오른쪽이 2 이상 깊으면 좌회전
    if node.left.height < node.right.height - 1:
      # 우서브에서 왼쪽이 깊으면 우서브를 우회전
      if node.right.left.height > node.right.right.height:
        node.right = right(node.right)
      return left(node)
    return node

  def print(self):
    l = [[self.root]]
    while l[-1].count(self.nil) != len(l[-1]):
      l.append([self.nil for _ in range(len(l[-1]) * 2)])
      for i in range(len(l[-2])):
        if l[-2][i] == self.nil: continue
        l[-1][i*2] = l[-2][i].left
        l[-1][i*2+1] = l[-2][i].right
    w = 2 ** len(l)
    for l in l:
      for node in l:
        if node == self.nil:
          print(f'{".":^{w}}', end='')
        else:
          print(f'{node.key:^{w}}', end='')
      w //= 2
      print()

t = AVLTree()
# for i in range(10):
#   t.push(10-i-1)
#   t.print()
#   print()

# for i in range(10):
#   t.pop(i)
#   t.print()
#   print()
t.push(10)
t.push(20)
t.push(5)
t.push(80)
t.push(90)
t.push(7550)
t.push(30)
t.push(77)
t.push(15)
t.push(40)
t.print()
t.pop(7550)
t.print()
t.pop(10)
t.print()
# t.pop(10)
# t.print()
