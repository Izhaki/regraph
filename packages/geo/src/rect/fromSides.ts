import { IRect } from './types';

export default (
  top: number,
  right: number,
  bottom: number,
  left: number
): IRect => ({
  x: left,
  y: top,
  width: right - left,
  height: bottom - top,
});
