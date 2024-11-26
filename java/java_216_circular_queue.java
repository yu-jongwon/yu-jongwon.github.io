class CircularQueue {
  int[] values = new int[1];
  int size = 1;
  int front = 0;
  int rear = 0;
  int length = 0;

  void push(int value) {
    if (this.length == this.size) this.grow();
    this.values[this.rear] = value;
    this.rear = (this.rear + 1) % this.size;
    this.length += 1;
  }

  int pop() {
    var value = this.values[this.front];
    this.front = (this.front + 1) % this.size;
    this.length -= 1;
    return value;
  }

  void grow() {
    var t = this.values;
    this.values = new int[this.values.length * 2];
    for (var i = 0; i < t.length; i++) {
      var idx = (this.front + i) % this.size;
      this.values[i] = t[idx];
    }
    this.size *= 2;
    this.front = 0;
    this.rear = this.length;
  }

  void print() {
    System.out.print("#");
    for (var i = 0; i < this.size; i++) {
      System.out.printf("%3d", this.values[i]);
    }
    System.out.println();
    System.out.print("[");
    if (this.length > 0) {
      System.out.printf("%d", this.values[this.front]);
    }
    for (int i = 1; i < this.length; i++) {
      var idx = (this.front + i) % this.size;
      System.out.printf(", %d", this.values[idx]);
    }
    System.out.println("]");
  }

  public static void main(String[] args) {
    var q = new CircularQueue();
    for (var i = 0; i < 5; i++) {
      q.push(i);
      q.print();
    }
    System.out.println();
    System.out.println();
    for (var i = 0; i < 3; i++) {
      q.pop();
      q.print();
    }
    System.out.println();
    System.out.println();
    for (var i = 5; i < 12; i++) {
      q.push(i);
      q.print();
    }
  }
}
