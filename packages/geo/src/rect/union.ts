import { Rect, Rects } from './Rect';
import fromSides from './fromSides';
import { getTop, getRight, getBottom, getLeft } from './corners';

const apply = fn => (args): number => fn(...args);
const min = apply(Math.min);
const max = apply(Math.max);

export default (rects: Rects): Rect =>
  fromSides(
    min(rects.map(getTop)),
    max(rects.map(getRight)),
    max(rects.map(getBottom)),
    min(rects.map(getLeft))
  );
