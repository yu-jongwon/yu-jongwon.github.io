// bubble sort
declare function random(): number;
declare function floor(n: number): number;

printline('# bubble sort');

let n = 10;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) {
  a[i] = floor(random() * 10);
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n - i - 1; j += 1) {
    if (a[j] <= a[j+1]) { continue; }
    let t = a[j];
    a[j] = a[j+1];
    a[j+1] = t;
  }
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
