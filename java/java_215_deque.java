class Deque {
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

  Deque() {
    this.head.prev = this.head;
    this.head.next = this.head;
  }

  void push_front(int value) {
    var node = new Node(value, this.head, this.head.next);
    this.head.next.prev = node;
    this.head.next = node;
  }

  void push_back(int value) {
    var node = new Node(value, this.head.prev, this.head);
    this.head.prev.next = node;
    this.head.prev = node;
  }

  int pop_front() {
    var node = this.head.next;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node.value;
  }

  int pop_back() {
    var node = this.head.prev;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node.value;
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

  public static void main(String[] args) {
    var deque = new Deque();
    deque.print();
    deque.push_front(1);
    deque.print();
    deque.push_back(2);
    deque.print();
    System.out.println(deque.pop_front());
    deque.print();
    System.out.println(deque.pop_back());
    deque.print();
  }
}
