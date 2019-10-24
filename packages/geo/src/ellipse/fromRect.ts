import { Rect } from '@regraph/geo/rect';
import Ellipse from './Ellipse';

export default ({ x, y, width, height }: Rect): Ellipse => ({
  center: {
    x: x + width / 2,
    y: y + height / 2,
  },
  rx: width / 2,
  ry: height / 2,
});
