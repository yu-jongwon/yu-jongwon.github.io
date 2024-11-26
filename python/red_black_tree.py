import random

class Node:
  def __init__(self, key = None, red = False, parent = None):
    self.key = key
    self.red = red
    self.parent = parent
    self.left = None
    self.right = None

class RedBlackTree:
  def __init__(self):
    self.root = None

  def rotate(self, node):
    parent = node.parent
    # R 회전
    if node.key < parent.key:
      parent.left = node.right
      if node.right: node.right.parent = parent
      node.right = parent
    # L 회전
    else:
      parent.right = node.left
      if node.left: node.left.parent = parent
      node.left = parent
    node.parent = parent.parent
    if   parent.parent == None:        self.root = node
    elif parent == parent.parent.left: parent.parent.left = node
    else:                              parent.parent.right = node
    parent.parent = node

  def push(self, key):
    def balance(node):
      if not (node.parent and node.parent.red): return
      ## LL, RR 회전
      if (node.key < node.parent.key) == (node.key < node.parent.parent.key):
        node.parent.red = False
        node.parent.parent.red = True
        self.rotate(node.parent)
      # LR, RL 회전
      else:
        node.red = False
        node.parent.parent.red = True
        self.rotate(node)
        self.rotate(node)
    # 루트가 없는 경우
    if self.root == None:
      self.root = Node(key = key)
      return
    # 삽입 위치 탐색
    p = None
    n = self.root
    while n:
      # 같은 키가 있으면 무시
      if key == n.key: return
      # 자식이 둘이고 모두 레드면 색상 변환 후 균형 맞춤
      if n.left and n.right and n.left.red and n.right.red:
        n.red = True
        n.left.red = False
        n.right.red = False
        balance(n)
      p = n
      n = n.left if key < n.key else n.right
    # 새 노드 삽입
    n = Node(key = key, red = True, parent = p)
    if key < p.key: p.left  = n
    if key > p.key: p.right = n
    balance(n)
    # 루트는 항상 검정
    self.root.red = False

  def pop(self, key):
    def red(node):
      n = node
      while n and not (n.red or (n.left and n.left.red) or (n.right and n.right.red)):
        n = n.parent
      if not n:
        n = self.root
        n.red = True
      if (n.left and n.left.red) or (n.right and n.right.red):
        n = n.left if n.left and n.left.red else n.right
        self.rotate(n, n.parent)
      while n.left and n.right:
        n.red = False
        n.left.red = True
        n.right.red = True
        if n.left.left and n.left.left.red:
          n.left.left.red = False
          self.rotate(n.left)
        elif n.left.right and n.left.right.red:
          n.left.red = False
          t = n.left.right
          self.rotate(t)
          self.rotate(t)
        elif n.right.left and n.right.left.red:
          n.right.red = False
          t = n.right.left
          self.rotate(t)
          self.rotate(t)
        elif n.right.right and n.right.right.red:
          n.right.right.red = False
          self.rotate(n.right)
        n = n.left if node.key < n.key else n.right
      # n.parent.red = False
      self.print()

    # 삭제 키의 위치를 찾는다.
    n = self.root
    while n and n.key != key:
      n = n.left if key < n.key else n.right

    # 삭제 노드의 자식이 둘이면, 후보자를 찾는다.
    # 후보자는 자식이 하나거나 없다.
    if n.left and n.right:
      s = n.right
      while s.left:
        s = s.left
      n.key = s.key
      n = s

    # 자식이 하나면 노드는 검정, 자식은 빨강이다.
    # 자식을 검정으로 바꿔서 삭제 노드를 대체한다.
    c = n.left if n.left else n.right
    if c:
      c.red = False
      c.parent = n.parent
    # 자식이 없는 검정 노드는 빨강으로 만든다.
    elif not n.red:
      red(n)

    if n.parent == None:
      self.root = c
    elif n == n.parent.left:
      n.parent.left = c
    else:
      n.parent.right = c
    self.root.red = False

  def check(self):
    count = 0
    realMinDepth = 100000
    realMaxDepth = 0
    depth = 0
    def f(node, blackDepth, minDepth, maxDepth):
      nonlocal count
      nonlocal realMinDepth
      nonlocal realMaxDepth
      nonlocal depth
      if node == None:
        if depth == 0:
          depth = blackDepth
        if depth != blackDepth:
          raise 'depth are different'
        realMinDepth = min(realMinDepth, minDepth)
        realMaxDepth = max(realMaxDepth, maxDepth)
        return
      count += 1
      if node.red and node.parent and node.parent.red:
        raise 'doubling reds.'
      if node.red and node.left and not node.right:
        raise 'a red node has only left child'
      if node.red and not node.left and node.right:
        raise 'a red node has only right child'
      if not node.red and node.left and not node.right and not node.left.red:
        raise 'a black node has a black left child only'
      if not node.red and not node.left and node.right and not node.right.red:
        raise 'a black node has a black right child only'
      if not node.red: blackDepth += 1
      f(node.left, blackDepth, minDepth + 1, maxDepth + 1)
      f(node.right, blackDepth, minDepth + 1, maxDepth + 1)
    f(self.root, 0, 0, 0)
    print(count)
    print(realMinDepth)
    print(realMaxDepth)
    print(depth)

  def print(self):
    l = [[self.root]]
    while l[-1].count(None) != len(l[-1]):
      l.append([None for _ in range(len(l[-1]) * 2)])
      for i in range(len(l[-2])):
        if l[-2][i] == None: continue
        l[-1][i*2] = l[-2][i].left
        l[-1][i*2+1] = l[-2][i].right
    w = 2 ** len(l)
    for l in l:
      for node in l:
        if node == None:
          print(f'{".":^{w}}', end='')
        elif node.red:
          print(f'\033[31m{node.key:^{w}}\033[0m', end='')
        else:
          print(f'\033[37m{node.key:^{w}}\033[0m', end='')
      w //= 2
      print()

t = RedBlackTree()

# n = 1000000 - 1
# values = [random.randrange(1, n) for i in range(n)]
# values = [i for i in range(n)]
# for _ in range(10):
#   n.pop(random.randint(0, 3))
# random.shuffle(values)
# print(n)
# for i in values: # [2, 12, 1, 3, 14, 11, 4, 7, 0, 10, 9, 13, 8, 5, 6]:
#   t.push(i)
  # t.print()
# t.check()

t.push(1)
t.push(3)
t.push(5)
t.push(4)
t.print()
t.pop(1)
t.print()

# for i in range(9):
#   t.push(i)
#   t.print()
#   print()

# for i in range(-8, 1):
#   t.push(i)
#   t.print()
#   print()

# for i in range(8, -1, -1):
#   t.push(i)
#   t.print()
#   print()

# for i in range(0, -9, -1):
#   t.push(i)
#   t.print()
#   print()

# t.push(1)
# t.push(2)
# t.push(7)
# t.push(8)
# t.push(4)
# t.push(3)
# t.push(5)
# t.push(6)
# t.print()
