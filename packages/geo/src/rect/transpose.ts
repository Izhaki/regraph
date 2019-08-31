import { IRect } from './types';
import { IPoint } from '../point';

export default (rect: IRect, offset: IPoint): IRect => {
  rect.x += offset.x;
  rect.y += offset.y;
  return rect;
};
