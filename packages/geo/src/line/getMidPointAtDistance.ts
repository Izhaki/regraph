import { Point } from '@regraph/geo/point';
import Line from './Line';
import getMidPoint from './getMidPoint';

const { sqrt } = Math;

// Based on https://stackoverflow.com/questions/20890270
export default (line: Line, distance: number): Point => {
  const mid = getMidPoint(line);

  if (distance === 0) {
    return mid;
  }

  const { src, dst } = line;
  const a = src.y - dst.y;
  const b = dst.x - src.x;

  const norm = sqrt(a * a + b * b);
  return {
    x: mid.x + (a / norm) * distance,
    y: mid.y + (b / norm) * distance,
  };
};
