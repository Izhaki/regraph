import { Rect } from './types';
import { Point } from '../point';

export default (rect: Rect, offset: Point): Rect => {
  rect.x += offset.x;
  rect.y += offset.y;
  return rect;
};
