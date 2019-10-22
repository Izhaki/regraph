import { Line } from './Line';
import getPointAtLength from './getPointAtLength';

export default (line: Line, startTrim: number, endTrim: number): Line => {
  if (startTrim) {
    const src = getPointAtLength(line, startTrim);
    line.src.x = src.x;
    line.src.y = src.y;
  }
  if (endTrim) {
    const dst = getPointAtLength(line, -endTrim);
    line.dst.x = dst.x;
    line.dst.y = dst.y;
  }
  return line;
};
