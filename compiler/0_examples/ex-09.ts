// quick select
declare function random(): number;
declare function floor(n: number): number;

printline('# quick select 1');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) {
  a[i] = floor(random() * 10);
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();

let k = n - 1;
let low = 0;
let high = n - 1;
while (true) {
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
  if (i == k) break;
}

for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
printline(a[k]);
