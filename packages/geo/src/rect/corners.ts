import { IPoint } from '../point';
import { IRect } from './types';

export const getTop = (rect: IRect) => rect.y;
export const getRight = (rect: IRect) => rect.x + rect.width;
export const getBottom = (rect: IRect) => rect.y + rect.height;
export const getLeft = (rect: IRect) => rect.x;

export const getTopLeft = (rect: IRect): IPoint => ({
  x: getLeft(rect),
  y: getTop(rect),
});

export const getTopRight = (rect: IRect): IPoint => ({
  x: getRight(rect),
  y: getTop(rect),
});

export const getBottomRight = (rect: IRect): IPoint => ({
  x: getRight(rect),
  y: getBottom(rect),
});

export const getBottomLeft = (rect: IRect): IPoint => ({
  x: getLeft(rect),
  y: getBottom(rect),
});
