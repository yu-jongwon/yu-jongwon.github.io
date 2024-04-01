class List {
  data: Array<number>;
  size: number;

  constructor () {
    this.size = 0;
    this.data = new Array<number>(1);
  }

  grow () {
    let p = this.data;
    this.data = new Array<number>(this.data.length * 2);
    for (let i = 0; i < p.length; i += 1) {
      this.data[i] = p[i];
    }
  }

  push_back (v: number) {
    if (this.data.length == this.size) {
      this.grow();
    }
    this.data[this.size] = v;
    this.size += 1;
  }

  pop_back (): number {
    this.size -= 1;
    return this.data[this.size];
  }
}

let list = new List();
for (let i = 0; i < 10; i += 1) {
  list.push_back(i);
  printline(list.data[i], list.size);
}
printline();
while (list.size > 0) {
  printline(list.pop_back(), list.size);
}
