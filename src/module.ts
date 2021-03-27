type ReturnsNum = (x: number, y?: number) => number;

interface EulerConfig {
  dyDx: ReturnsNum;
  xInitial: number;
  yInitial: number;
  step: number;
  limit: number;
}

// Fixes floating point precision error
const fixFP = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

export const euler = (config: EulerConfig) => {
  const memoYandDyDx = new Map<number, [number, number]>();
  const yNPlusOne = (x: number): number => {
    const incX = fixFP(x + config.step);
    if (x === config.xInitial) {
      memoYandDyDx.set(x, [config.yInitial, config.dyDx(x, config.yInitial)]);
      return yNPlusOne(incX);
    }
    const prev = memoYandDyDx.get(fixFP(x - config.step));
    const y = fixFP(fixFP(prev![0]) + fixFP(config.step * prev![1]));
    memoYandDyDx.set(x, [y, config.dyDx(x, y)]);
    if (x === config.limit) {
      return y;
    } else {
      return yNPlusOne(incX);
    }
  };
  return yNPlusOne(config.xInitial);
};
