class CircularLinkedList {
  Node tail = new Node(0, null);

  CircularLinkedList() {
    this.tail.next = this.tail;
  }

  void insert(int index, int value) {
    var node = this.tail.next;
    var head = node;
    while (node.next != head && index > 0) {
      node = node.next;
      index -= 1;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    node.next = new Node(value, node.next);
    if (node.next.next == head) {
      this.tail = node.next;
    }
  }

  void delete(int index) {
    var node = this.tail.next;
    var head = this.tail.next;
    while (node.next != head && index > 0) {
      node = node.next;
      index -= 1;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    node.next = node.next.next;
  }

  void print() {
    var head = this.tail.next;
    var node = head.next;
    System.out.print("[");
    if (node != head) {
      System.out.printf("%d", node.value);
      node = node.next;
    }
    while (node != head) {
      System.out.printf(", %d", node.value);
      node = node.next;
    }
    System.out.printline("]");
  }

  void reverse() {
  }

  void sort() {
  }

  public static void main(String[] args) {
    var circularLinkedList = new CircularLinkedList();
    circularLinkedList.print();
    circularLinkedList.insert(0, 2);
    circularLinkedList.print();
    circularLinkedList.delete(0);
    circularLinkedList.print();
    circularLinkedList.insert(0, 1);
    circularLinkedList.print();
    circularLinkedList.insert(0, 0);
    circularLinkedList.print();
    circularLinkedList.insert(2, 3);
    circularLinkedList.print();
    circularLinkedList.insert(3, 4);
    circularLinkedList.print();
    circularLinkedList.insert(4, 5);
    circularLinkedList.print();
    circularLinkedList.delete(0);
    circularLinkedList.print();
    circularLinkedList.delete(3);
    circularLinkedList.print();
    circularLinkedList.delete(1);
    circularLinkedList.print();
  }
}

class Node {
  int value;
  Node next;

  Node() {}

  Node(int value) {
    this.value = value;
  }

  Node(int value, Node next) {
    this.value = value;
    this.next = next;
  }
}