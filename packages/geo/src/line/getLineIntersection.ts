import { Point } from '../point';

export default ({ p1: a1, p2: a2 }, { p1: b1, p2: b2 }): Point => {
  const uB = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

  if (uB !== 0) {
    const uAt = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    const uBt = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    const ua = uAt / uB;
    const ub = uBt / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return { x: a1.x + ua * (a2.x - a1.x), y: a1.y + ua * (a2.y - a1.y) };
    }
  }
  return undefined;
};
