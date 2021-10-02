type ReturnsNum = (x: number, y?: number) => number;

interface EulerConfig {
  dyDx: ReturnsNum;
  xInitial: number;
  yInitial: number;
  step: number;
  limit: number;
}

const round = (num: number, precision: number) =>
  Math.round((num + Number.EPSILON) * precision) / precision;

const isPrecise = (x: number, y: number, precision: number) => {
  return round(Math.abs(x - y), precision) <= 1 / precision;
};

export const euler = (config: EulerConfig) => {
  const memoYandDyDx = new Map<number, [number, number]>();
  const yNPlusOne = (x: number): number => {
    const incX = round(x + config.step, 100);
    if (x === config.xInitial) {
      memoYandDyDx.set(x, [config.yInitial, config.dyDx(x, config.yInitial)]);
      return yNPlusOne(incX);
    }
    const prev = memoYandDyDx.get(round(x - config.step, 100));
    const y = round(
      round(prev![0], 100) + round(config.step * prev![1], 100),
      100
    );
    memoYandDyDx.set(x, [y, config.dyDx(x, y)]);
    if (x === config.limit) {
      return y;
    } else {
      return yNPlusOne(incX);
    }
  };
  return yNPlusOne(config.xInitial);
};

/**
 * This function is used for solving and estimating the
 * values in set of simultaneous linear equations.
 *
 * In our case, we are using it to calculate the ddensity
 * or anything really of the surrounding squares around a grid square
 */
export const gaussSeidel = (
  functions: Array<(...params: number[]) => number>,
  initialValues: number[],
  precision: number,
  finalPrecision = 10
) => {
  const initialValuesClone = [...initialValues];
  const prevIterationValues: number[] = [];
  let precisionCount = 0;
  while (precisionCount < initialValues.length) {
    precisionCount = 0;
    initialValues.forEach((_, index) => {
      initialValuesClone[index] = functions[index](...initialValuesClone);
      if (prevIterationValues[index] !== undefined && prevIterationValues) {
        if (
          isPrecise(
            prevIterationValues[index],
            initialValuesClone[index],
            precision
          )
        ) {
          precisionCount += 1;
        }
      }
      prevIterationValues[index] = initialValuesClone[index];
    });
  }
  return initialValuesClone.map((v) => round(v, finalPrecision));
};

// This method gets the estimates after a certain number of iterations
export const gaussSeidel1 = (
  functions: Array<(...params: number[]) => number>,
  initialValues: number[],
  iter: number
) => {
  const initialValuesClone = [...initialValues];
  for (let i = 0; i < iter; i++) {
    initialValues.forEach((_, index) => {
      initialValuesClone[index] = functions[index](...initialValuesClone);
    });
  }
  return initialValuesClone;
};
