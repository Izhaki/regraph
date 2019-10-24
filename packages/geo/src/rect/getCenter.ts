import { Point } from '@regraph/geo/point';
import { Rect } from './Rect';

export default (rect: Rect): Point => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
});
