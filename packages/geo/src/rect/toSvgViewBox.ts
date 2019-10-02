import { Rect } from './Rect';

export default (rect: Rect): string =>
  `${rect.x} ${rect.y} ${rect.width} ${rect.height}`;
