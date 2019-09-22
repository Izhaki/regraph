import { Rect } from './Rect';

export default (
  top: number,
  right: number,
  bottom: number,
  left: number
): Rect => ({
  x: left,
  y: top,
  width: right - left,
  height: bottom - top,
});
