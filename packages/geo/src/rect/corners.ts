import { Point } from '@regraph/geo/point';
import { Rect } from './Rect';

export const getTop = (rect: Rect): number => rect.y;
export const getRight = (rect: Rect): number => rect.x + rect.width;
export const getBottom = (rect: Rect): number => rect.y + rect.height;
export const getLeft = (rect: Rect): number => rect.x;

export const getTopLeft = (rect: Rect): Point => ({
  x: getLeft(rect),
  y: getTop(rect),
});

export const getTopRight = (rect: Rect): Point => ({
  x: getRight(rect),
  y: getTop(rect),
});

export const getBottomRight = (rect: Rect): Point => ({
  x: getRight(rect),
  y: getBottom(rect),
});

export const getBottomLeft = (rect: Rect): Point => ({
  x: getLeft(rect),
  y: getBottom(rect),
});
