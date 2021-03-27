import { euler } from "./module";

console.log(
  euler({
    dyDx: (x, y) => x + 2 * y!,
    xInitial: 2,
    yInitial: 3,
    step: 0.1,
    limit: 2.5,
  })
);
