import { Point } from '@regraph/geo/point';

export default interface Ellipse {
  center: Point;
  rx: number;
  ry: number;
}
