import { Point } from './Point';
import { isNumber } from '../utils';

export default (point: Point): boolean =>
  point && isNumber(point.x) && isNumber(point.y);
