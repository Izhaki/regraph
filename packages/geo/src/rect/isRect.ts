import { Rect } from './Rect';

const isNumber = (x: number): boolean => typeof x === 'number';
export default (rect: Rect): boolean =>
  rect &&
  isNumber(rect.x) &&
  isNumber(rect.y) &&
  isNumber(rect.width) &&
  isNumber(rect.height);
