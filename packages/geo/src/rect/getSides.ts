import { Line } from '../line';

import {
  getTopLeft,
  getTopRight,
  getBottomRight,
  getBottomLeft,
} from './corners';

export const getTopSide = (rect): Line => ({
  p1: getTopLeft(rect),
  p2: getTopRight(rect),
});

export const getRightSide = (rect): Line => ({
  p1: getTopRight(rect),
  p2: getBottomRight(rect),
});

export const getBottomSide = (rect): Line => ({
  p1: getBottomLeft(rect),
  p2: getBottomRight(rect),
});

export const getLefSide = (rect): Line => ({
  p1: getTopLeft(rect),
  p2: getBottomLeft(rect),
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
