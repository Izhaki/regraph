import { IRect, IRects } from './types';
import fromSides from './fromSides';
import { getTop, getRight, getBottom, getLeft } from './corners';

const apply = fn => (args: any[]): number => fn(...args);
const min = apply(Math.min);
const max = apply(Math.max);

export default (rects: IRects): IRect =>
  fromSides(
    min(rects.map(getTop)),
    max(rects.map(getRight)),
    max(rects.map(getBottom)),
    min(rects.map(getLeft))
  );
