class PriorityQueue {
  int length = 0;
  int[] a = new int[10];

  public void push(int value) {
    this.a[this.length++] = value;
    var c = this.length - 1;
    var p = (c - 1);
    while (p >= 0 && this.a[p] < this.a[c]) {
      var t = this.a[p];
      this.a[p] = this.a[c];
      this.a[c] = t;
      c = p;
      p = (c - 1);
    }
  }

  public int pop() {
    var v = this.a[0];
    this.length -= 1;
    if (this.length == 0) return v;

    this.a[0] = this.a[this.length];
    var p = 0;
    while (true) {
      var c = p;
      var l = p * 2 + 1;
      var r = p * 2 + 2;
      if (l < this.length && this.a[c] < this.a[l]) c = l;
      if (r < this.length && this.a[c] < this.a[r]) c = r;
      if (c == p) break;
      var t = this.a[c];
      this.a[c] = this.a[p];
      this.a[p] = t;
      p = c;
    }
    return v;
  }

  public void print() {
    for (var i = 0; i < this.length; i++) {
      System.out.print(this.a[i]);
    }
    System.out.println();
  }

  public int length() {
    return this.length;
  }

  public static void main(String[] args) {
    var priorityQueue = new PriorityQueue();
    priorityQueue.push(2);
    priorityQueue.print();
    priorityQueue.push(1);
    priorityQueue.print();
    priorityQueue.push(3);
    priorityQueue.print();
    priorityQueue.push(9);
    priorityQueue.print();
    System.out.println(priorityQueue.pop());
    priorityQueue.print();
    System.out.println(priorityQueue.pop());
    priorityQueue.print();
    System.out.println(priorityQueue.pop());
    priorityQueue.print();
    System.out.println(priorityQueue.pop());
  }
}
