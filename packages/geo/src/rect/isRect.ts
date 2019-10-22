import { Rect } from './Rect';
import { isNumber } from '../utils';

export default (rect: Rect): boolean =>
  rect &&
  isNumber(rect.x) &&
  isNumber(rect.y) &&
  isNumber(rect.width) &&
  isNumber(rect.height);
