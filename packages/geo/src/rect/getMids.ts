import { Point } from '@regraph/geo/point';
import Rect from './Rect';

export const getTopMid = (rect: Rect): Point => ({
  x: rect.x + rect.width / 2,
  y: rect.y,
});

export const getRightMid = (rect: Rect): Point => ({
  x: rect.x + rect.width,
  y: rect.y + rect.height / 2,
});

export const getBottomMid = (rect: Rect): Point => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height,
});

export const getLeftMid = (rect: Rect): Point => ({
  x: rect.x,
  y: rect.y + rect.height / 2,
});
