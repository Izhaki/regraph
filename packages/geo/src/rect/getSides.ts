import { Line } from '@regraph/geo/line';
import Rect from './Rect';

import {
  getTopLeft,
  getTopRight,
  getBottomRight,
  getBottomLeft,
} from './corners';

export const getTopSide = (rect: Rect): Line => ({
  src: getTopLeft(rect),
  dst: getTopRight(rect),
});

export const getRightSide = (rect: Rect): Line => ({
  src: getTopRight(rect),
  dst: getBottomRight(rect),
});

export const getBottomSide = (rect: Rect): Line => ({
  src: getBottomLeft(rect),
  dst: getBottomRight(rect),
});

export const getLefSide = (rect: Rect): Line => ({
  src: getTopLeft(rect),
  dst: getBottomLeft(rect),
});

export interface Sides {
  top: Line;
  right: Line;
  bottom: Line;
  left: Line;
}

export const getSides = (rect: Rect): Sides => ({
  top: getTopSide(rect),
  right: getRightSide(rect),
  bottom: getBottomSide(rect),
  left: getLefSide(rect),
});
