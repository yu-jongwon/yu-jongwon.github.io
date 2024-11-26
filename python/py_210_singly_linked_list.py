class Node:
  def __init__(self, value, next = None):
    self.value = value
    self.next = next

class SinglyLinkedList:
  def __init__(self):
    self.head = Node('head')

  def push_front(self, value):
    self.head.next = Node(value, self.head.next)

  def push_back(self, value):
    node = self.head
    while (node.next != None):
      node = node.next
    node.next = Node(value)

  def pop_front(self):
    self.head.next = self.head.next.next

  def pop_back(self):
    prev = None
    node = self.head
    while (node.next != None):
      prev = node
      node = node.next
    prev.next = None

  def get(self, index):
    node = self.head.next
    while node != None and index > 0:
      node = node.next
      index -= 1
    return node.value

  def __str__(self):
    s = '['
    node = self.head.next
    if node != None:
      s += repr(node.value)
      node = node.next
    while node != None:
      s += ', ' + repr(node.value)
      node = node.next
    return s + ']'

  def insert(self, index, value):
    node = self.head
    while node.next != None and index > 0:
      node = node.next
      index -= 1
    if index > 0: raise IndexError()
    node.next = Node(value, node.next)

  def delete(self, index):
    node = self.head
    while node.next != None and index > 0:
      node = node.next
      index -= 1
    if index > 0: raise IndexError(index)
    node.next = node.next.next

  def reverse(self):
    new = None
    node = self.head.next
    while node != None:
      temp = node
      node = node.next
      temp.next = new
      new = temp
    self.head.next = new

  def sort(self):
    node1 = self.head.next
    while node1 != None:
      node2 = node1.next
      while node2 != None:
        if node1.value > node2.value:
          node1.value, node2.value = node2.value, node1.value
        node2 = node2.next
      node1 = node1.next

l = SinglyLinkedList()
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

