import { Rect } from './Rect';
import { Point } from '../point';

export default (rect: Rect): Point => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
});
