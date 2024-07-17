// quick select
declare function random(): number;
declare function floor(n: number): number;

function partition(a: Array<number>, low: number, high: number): number {
  let i = low;
  for (let j = low; j < high; j += 1) {
    if (a[j] > a[high]) continue;
    if (i != j) {
      let t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    i += 1;
  }
  let t = a[i];
  a[i] = a[high];
  a[high] = t;
  return i;
}

function search(a: Array<number>, low: number, high: number, k: number): number {
  let mid = partition(a, low, high);
  if (k < mid) return search(a, low, mid - 1, k);
  if (k > mid) return search(a, mid + 1, high, k);
  return a[k];
}

printline('# quick select 3');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) a[i] = floor(random() * 10);
for (let i = 0; i < n; i += 1) print(a[i]);
printline();

let k = n - 1;
let low = 0;
let high = n - 1;
let result = search(a, low, high, k);
for (let i = 0; i < n; i += 1) print(a[i]);
printline();
printline(result);
