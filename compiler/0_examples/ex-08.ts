// merge sort
declare function random(): number;
declare function floor(n: number): number;

function sort(a: Array<number>, low: number, high: number): void {
  if (low >= high) return;

  let mid = floor((low + high) / 2);
  sort(a, low, mid);
  sort(a, mid + 1, high);

  let t = new Array<number>(high - low + 1);
  let i = low;
  let j = mid + 1;
  let k = 0;
  while (i <= mid && j <= high) {
    if (a[i] < a[j]) {
      t[k] = a[i];
      k += 1;
      i += 1;
    } else {
      t[k] = a[j];
      k += 1;
      j += 1;
    }
  }
  while (i <= mid) {
    t[k] = a[i];
    k += 1;
    i += 1;
  }
  while (j <= high) {
    t[k] = a[j];
    k += 1;
    j += 1;
  }
  for (let i = 0; i < k; i += 1) {
    a[low + i] = t[i];
  }
}

printline('# merge sort');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) {
  a[i] = floor(random() * 10);
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();

sort(a, 0, n - 1);

for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
