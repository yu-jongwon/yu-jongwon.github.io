// heap sort
declare function random(): number;
declare function floor(n: number): number;

printline('# heap sort');

let n = 7;
let a = new Array<number>(n);
for (let i = 0; i < n; i += 1) a[i] = floor(random() * 10);

for (let i = 0; i < n; i += 1) print(a[i]);
printline();

for (let i = floor(n / 2 - 1); i >= 0; i -= 1) {
  let p = i;
  while (true) {
    let c = p;
    let l = p * 2 + 1;
    let r = p * 2 + 2;
    if (l < n && a[c] < a[l]) c = l;
    if (r < n && a[c] < a[r]) c = r;
    if (c == p) break;
    let t = a[c];
    a[c] = a[p];
    a[p] = t;
    p = c;
  }
}

for (let i = n - 1; i > 0; i -= 1) {
  let t = a[0];
  a[0] = a[i];
  a[i] = t;
  let p = 0;
  while (true) {
    let c = p;
    let l = p * 2 + 1;
    let r = p * 2 + 2;
    if (l < i && a[c] < a[l]) c = l;
    if (r < i && a[c] < a[r]) c = r;
    if (c == p) break;
    let t = a[c];
    a[c] = a[p];
    a[p] = t;
    p = c;
  }
}

for (let i = 0; i < n; i += 1) print(a[i]);
printline();
