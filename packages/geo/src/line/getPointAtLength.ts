import { Point } from '@regraph/geo/point';
import { Line } from './Line';
import getLength from './getLength';
import getPointAtTime from './getPointAtTime';
import { abs, isNegativeZero, isPositive } from '../utils';

const getPointAtLength = (
  line: Line,
  length: number,
  fromStart = true
): Point => {
  const lineLength = getLength(line);
  const time = (fromStart ? length : lineLength - length) / lineLength;
  return getPointAtTime(line, time);
};

export default (line: Line, length: number): Point => {
  if (isNegativeZero(length)) {
    return line.dst;
  }
  if (length === 0) {
    return line.src;
  }
  const fromStart = isPositive(length);
  return getPointAtLength(line, abs(length), fromStart);
};
