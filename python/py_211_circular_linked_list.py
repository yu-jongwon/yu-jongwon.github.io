class Node:
  def __init__(self, value, next = None):
    self.value = value
    self.next = next

class CircularLinkedList:
  def __init__(self):
    self.tail = Node(None)
    self.tail.next = self.tail

  def push_front(self, value):
    head = self.tail.next
    head.next = Node(value, head.next)

  def push_back(self, value):
    self.tail.next = Node(value, self.tail.next)
    self.tail = self.tail.next

  def pop_front(self):
    head = self.tail.next
    head.next = head.next.next

  def pop_back(self):
    head = self.tail.next
    prev = head
    node = head.next
    while (node.next != head):
      prev = node
      node = node.next
    prev.next = node.next
    self.tail = prev

  def get(self, index):
    head = self.tail.next
    node = head.next
    while node != head and index > 0:
      node = node.next
      index -= 1
    return node.value

  def __str__(self):
    s = '['
    head = self.tail.next
    node = head.next
    if node != head:
      s += repr(node.value)
      node = node.next
    while node != head:
      s += ', ' + repr(node.value)
      node = node.next
    return s + ']'

  def insert(self, index, value):
    node = head = self.tail.next
    while node.next != head and index > 0:
      node = node.next
      index -= 1
    if index > 0: raise IndexError()
    node.next = Node(value, node.next)
    if node.next.next == head:
      self.tail = node.next

  def delete(self, index):
    node = head = self.tail.next
    while node.next != head and index > 0:
      node = node.next
      index -= 1
    if index > 0: raise IndexError()
    node.next = node.next.next

  def reverse(self):
    pass

  def sort(self):
    pass

l = CircularLinkedList()
l.push_front(1)
l.push_front(2)
l.push_front(3)
l.push_back(4)
l.push_back(5)
l.push_back(6)
# l.pop_front()
# l.pop_front()
# l.pop_back()
# l.pop_back()
print(l.get(0))
print(l.get(1))
print(l)
