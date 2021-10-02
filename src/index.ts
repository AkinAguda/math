import { euler, gaussSeidel, gaussSeidel1 } from "./module";

console.log(
  euler({
    dyDx: (x, y) => x + 2 * y!,
    xInitial: 2,
    yInitial: 3,
    step: 0.1,
    limit: 2.5,
  })
);

console.log(
  gaussSeidel(
    [
      (a, b, c, d) => (1 / 10) * (3 + 2 * b + c + d),
      (a, b, c, d) => (1 / 10) * (15 + 2 * a + c + d),
      (a, b, c, d) => (1 / 10) * (27 + a + b + d),
      (a, b, c, d) => (1 / 10) * (-9 + a + b + 2 * c),
    ],
    [0, 0, 0, 0],
    1000
  )
);

console.log(
  gaussSeidel1(
    [
      (a, b, c, d) => (1 / 10) * (3 + 2 * b + c + d),
      (a, b, c, d) => (1 / 10) * (15 + 2 * a + c + d),
      (a, b, c, d) => (1 / 10) * (27 + a + b + d),
      (a, b, c, d) => (1 / 10) * (-9 + a + b + 2 * c),
    ],
    [0, 0, 0, 0],
    21
  )
);
