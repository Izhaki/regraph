import Bezier from 'bezier-js';
import Quadratic from './Quadratic';
import { abs, isNegativeZero, isPositive } from '../utils';

interface Options {
  maxError?: number;
  maxIteration?: number;
}

const getTimeAtLength = (
  quad: Quadratic,
  length: number,
  fromStart: boolean,
  { maxError = 0.01, maxIteration: maxIterations = 10 }: Options = {}
): number => {
  const { src, c1, dst } = quad;
  const bezier = new Bezier(src.x, src.y, c1.x, c1.y, dst.x, dst.y);
  const quadLength = bezier.length();
  let factor = 1;
  let time;
  let error;
  let iteration = 0;
  do {
    // (length / quadLength) is the time approximation, which we then
    // refine using the factor.
    const Δtime = (length / quadLength) * factor;
    time = fromStart ? Δtime : 1 - Δtime;

    const { left, right } = bezier.split(time);
    const side = fromStart ? left : right;
    const sectionLen = side.length();
    error = sectionLen - length;
    factor *= length / sectionLen;
    iteration += 1;
  } while (error > maxError && iteration < maxIterations);

  return time;
};

export default (quad: Quadratic, length: number, options?: Options): number => {
  if (isNegativeZero(length)) {
    return 1;
  }
  if (length === 0) {
    return 0;
  }

  const fromStart = isPositive(length);

  return getTimeAtLength(quad, abs(length), fromStart, options);
};
