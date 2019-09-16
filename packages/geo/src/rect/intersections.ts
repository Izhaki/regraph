import { Point } from '../point';
import { getLineIntersection } from '../line';
import { getSides } from './getSides';
import getCenter from './getCenter';

// eslint-disable-next-line import/prefer-default-export
export const getIntersectionCenterToPoint = (rect, point): Point => {
  const { x: px, y: py } = point;
  const center = getCenter(rect);
  const { x: cx, y: cy } = center;
  const sides = getSides(rect);

  if (cx <= px) {
    delete sides.left;
  }

  if (cx >= px) {
    delete sides.right;
  }

  if (cy <= py) {
    delete sides.top;
  }

  if (cy >= py) {
    delete sides.bottom;
  }

  const line = { p1: center, p2: point };

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const side in sides) {
    const intersection = getLineIntersection(sides[side], line);
    if (intersection) {
      return intersection;
    }
  }
  return undefined;
};