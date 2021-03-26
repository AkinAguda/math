type ReturnsNum = (x: number, y?: number) => number;

interface EulerConfig {
  dyDx: ReturnsNum;
  xInitial: number;
  yInitial: number;
  step: number;
  limit: number;
}

export const euler = (config: EulerConfig) => {
  const memoYandDyDx = new Map<number, [number, number]>();
  const yNPlusOne = (x: number): number => {
    const incX = x + config.step;
    if (x === config.xInitial) {
      memoYandDyDx.set(0, [config.yInitial, config.dyDx(x, config.yInitial)]);
      return yNPlusOne(incX);
    }
    const prev = memoYandDyDx.get(x - config.step);
    const y = prev![0] + config.step * prev![1];
    memoYandDyDx.set(x, [y, config.dyDx(x, y)]);
    if (x === config.limit) {
      return y;
    } else {
      return yNPlusOne(incX);
    }
  };
  return yNPlusOne(config.xInitial);
};
