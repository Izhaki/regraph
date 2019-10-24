import { Point } from '@regraph/geo/point';
import { Rect } from './Rect';

export default (rect: Rect, offset: Point): Rect => {
  rect.x += offset.x;
  rect.y += offset.y;
  return rect;
};
