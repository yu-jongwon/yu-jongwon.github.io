// insertion sort
declare function random(): number;
declare function floor(n: number): number;

printline('# insertion sort');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) {
  a[i] = floor(random() * 10);
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
for (let i = 1; i < n; i += 1) {
  let t = a[i];
  let j = i;
  while (j > 0 && t < a[j - 1]) {
    a[j] = a[j - 1];
    j -= 1;
  }
  a[j] = t;
}
for (let i = 0; i < n; i += 1) {
  print(a[i]);
}
printline();
