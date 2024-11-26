class DoublyLinkedList {
  class Node {
    int value;
    Node prev;
    Node next;

    Node(int value, Node prev, Node next) {
      this.value = value;
      this.prev = prev;
      this.next = next;
    }
  }

  Node head = new Node(0, null, null);

  DoublyLinkedList() {
    this.head.prev = this.head;
    this.head.next = this.head;
  }

  void insert(int index, int value) {
    var node = this.head;
    while (node.next != this.head && index > 0) {
      index -= 1;
      node = node.next;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    var newNode = new Node(value, node, node.next);
    node.next.prev = newNode;
    node.next = newNode;
  }

  void delete(int index) {
    var node = this.head.next;
    while (node != this.head && index > 0) {
      index -= 1;
      node = node.next;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  void print() {
    var node = this.head.next;
    System.out.print('[');
    if (node != this.head) {
      System.out.printf("%d", node.value);
      node = node.next;
    }
    while (node != this.head) {
      System.out.printf(", %d", node.value);
      node = node.next;
    }
    System.out.println("]");
  }

  void reverse() {
    var node = this.head.next;
    var temp = this.head.prev;
    this.head.prev = this.head.next;
    this.head.next = temp;
    while (node != this.head) {
      temp = node.prev;
      node.prev = node.next;
      node.next = temp;
      node = node.prev;
    }
  }

  void sort() {
  }

  public static void main(String[] args) {
    var doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.print();
    doublyLinkedList.insert(0, 2);
    doublyLinkedList.print();
    doublyLinkedList.delete(0);
    doublyLinkedList.print();
    doublyLinkedList.insert(0, 1);
    doublyLinkedList.print();
    doublyLinkedList.insert(0, 0);
    doublyLinkedList.print();
    doublyLinkedList.insert(2, 3);
    doublyLinkedList.print();
    doublyLinkedList.insert(3, 4);
    doublyLinkedList.print();
    doublyLinkedList.insert(4, 5);
    doublyLinkedList.print();
    doublyLinkedList.delete(0);
    doublyLinkedList.print();
    doublyLinkedList.delete(3);
    doublyLinkedList.print();
    doublyLinkedList.delete(1);
    doublyLinkedList.print();
  }
}