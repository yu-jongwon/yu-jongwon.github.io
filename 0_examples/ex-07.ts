// selection sort
declare function random(): number;
declare function floor(n: number): number;

printline('# selection sort');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) {
  a[i] = floor(random() * 10);
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
for (let i = 0; i < n; i += 1) {
  let j = 0;
  for (let k = 0; k < n - i; k += 1) {
    if (a[j] < a[k]) j = k;
  }
  let t = a[n - i - 1];
  a[n - i - 1] = a[j];
  a[j] = t;
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
