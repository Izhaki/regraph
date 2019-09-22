import { Line } from './Line';
import { Point } from '../point';
import getLength from './getLength';
import getPointAtTime from './getPointAtTime';

export default (line: Line, length: number, fromStart = true): Point => {
  const lineLength = getLength(line);
  const time = (fromStart ? length : lineLength - length) / lineLength;
  return getPointAtTime(line, time);
};
