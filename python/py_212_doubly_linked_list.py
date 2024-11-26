class Node:
  def __init__(self, value, prev = None, next = None):
    self.value = value
    self.prev = prev
    self.next = next

class DoublyLinkedList:
  def __init__(self):
    self.head = Node(None)
    self.head.prev = self.head
    self.head.next = self.head

  def insert(self, index, value):
    node = self.head
    while node.next != self.head and index > 0:
      index -= 1
      node = node.next
    if index > 0: raise IndexError()
    new = Node(value, node, node.next)
    node.next.prev = new
    node.next = new

  def delete(self, index):
    node = self.head.next
    while node != self.head and index > 0:
      index -= 1
      node = node.next
    if index > 0: raise IndexError()
    node.prev.next = node.next
    node.next.prev = node.prev

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

  def reverse(self):
    node = self.head.next
    self.head.prev, self.head.next = self.head.next, self.head.prev
    while node != self.head:
      node.prev, node.next = node.next, node.prev
      node = node.prev

  def sort(self):
    pass

  def push_back(self, value):
    node = Node(value, self.head.prev, self.head)
    self.head.prev.next = node
    self.head.prev = node

  def push_front(self, value):
    node = Node(value, self.head, self.head.next)
    self.head.next.prev = node
    self.head.next = node

  def pop_front(self):
    self.delete(0)

  def length(self):
    c = 0
    node = self.head.next
    while node != self.head:
      c += 1
      node = node.next
    return c


  def pop_back(self):
    self.delete(self.length() - 1)

doublyLinkedList = DoublyLinkedList()
l = DoublyLinkedList(); l.print()
l.push_back(1);         l.print()
l.push_back(2);         l.print()
l.push_front(3);        l.print()
l.push_front(4);        l.print()
l.pop_back();           l.print()
l.pop_back();           l.print()
l.pop_back();           l.print()
l.pop_back();           l.print()
