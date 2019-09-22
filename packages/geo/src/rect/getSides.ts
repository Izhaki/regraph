import { Line } from '../line';

import {
  getTopLeft,
  getTopRight,
  getBottomRight,
  getBottomLeft,
} from './corners';

export const getTopSide = (rect): Line => ({
  src: getTopLeft(rect),
  dst: getTopRight(rect),
});

export const getRightSide = (rect): Line => ({
  src: getTopRight(rect),
  dst: getBottomRight(rect),
});

export const getBottomSide = (rect): Line => ({
  src: getBottomLeft(rect),
  dst: getBottomRight(rect),
});

export const getLefSide = (rect): Line => ({
  src: getTopLeft(rect),
  dst: getBottomLeft(rect),
});


export interface Sides {
  top: Line;
  right: Line;
  bottom: Line;
  left: Line;
}

export const getSides = (rect): Sides => ({
  top: getTopSide(rect),
  right: getRightSide(rect),
  bottom: getBottomSide(rect),
  left: getLefSide(rect),
});
