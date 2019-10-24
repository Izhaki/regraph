import Bezier from 'bezier-js';
import Quadratic from './Quadratic';
import getTimeAtLength from './getTimeAtLength';

export default (
  quad: Quadratic,
  startTrim: number,
  endTrim: number
): Quadratic => {
  const { src, c1, dst } = quad;
  const srcT = startTrim ? getTimeAtLength(quad, startTrim) : 0;
  const dstT = endTrim ? getTimeAtLength(quad, -endTrim) : 1;

  const bezier = new Bezier(src.x, src.y, c1.x, c1.y, dst.x, dst.y);
  const { 0: newSrc, 2: newDst } = bezier.split(srcT, dstT).points;

  src.x = newSrc.x;
  src.y = newSrc.y;
  dst.x = newDst.x;
  dst.y = newDst.y;

  return quad;
};
