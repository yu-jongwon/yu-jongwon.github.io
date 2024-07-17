declare function random(): number;
declare function floor(n: number): number;

// quick sort
function devide(a: Array<number>, low: number, high: number): void {
  if (low >= high) return;
  let mid = low;
  for (let j = low; j < high; j += 1) {
    if (a[j] > a[high]) continue;
    if (mid != j) {
      let t = a[mid];
      a[mid] = a[j];
      a[j] = t;
    }
    mid += 1;
  }
  let t = a[mid];
  a[mid] = a[high];
  a[high] = t;
  devide(a, low, mid-1);
  devide(a, mid+1, high);
}

printline('# quick sort');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) a[i] = floor(random() * 10);
for (let i = 0; i < n; i += 1) print(a[i]);
printline();

devide(a, 0, n - 1);

for (let i = 0; i < n; i += 1) print(a[i]);
printline();
