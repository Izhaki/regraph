import Line from './Line';

const { sqrt } = Math;
const sqr = (x: number): number => x ** 2;

export default (line: Line): number =>
  sqrt(sqr(line.src.x - line.dst.x) + sqr(line.src.y - line.dst.y));
