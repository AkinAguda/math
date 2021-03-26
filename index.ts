import { euler } from "./module";

console.log(
  euler({
    dyDx: (x, y) => x + 2 * y,
    xInitial: 0,
    yInitial: 0,
    step: 0.1,
    limit: 0.4,
  })
);
