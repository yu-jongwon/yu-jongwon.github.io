class Node:
  def __init__(self, value, prev = None, next = None):
    self.value = value
    self.prev = prev
    self.next = next

class Deque:
  def __init__(self):
    self.head = Node(None)
    self.head.prev = self.head
    self.head.next = self.head

  def push_front(self, value):
    node = Node(value, self.head, self.head.next)
    self.head.next.prev = node
    self.head.next = node

  def push_back(self, value):
    node = Node(value, self.head.prev, self.head)
    self.head.prev.next = node
    self.head.prev = node

  def pop_front(self):
    node = self.head.next
    node.prev.next = node.next
    node.next.prev = node.prev
    return node.value

  def pop_back(self):
    node = self.head.prev
    node.prev.next = node.next
    node.next.prev = node.prev
    return node.value

  def print(self):
    node = self.head.next
    print('[', end='')
    if node != self.head:
      print(node.value, end='')
      node = node.next
    while node != self.head:
      print(',', node.value, end='')
      node = node.next
    print(']')

deque = Deque()
deque.print()
deque.push_front(1)
deque.print()
deque.push_back(2)
deque.print()
print(deque.pop_front())
deque.print()
print(deque.pop_back())
deque.print()
