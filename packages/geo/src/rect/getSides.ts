import {
  getTopLeft,
  getTopRight,
  getBottomRight,
  getBottomLeft,
} from './corners';

export const getTopSide = rect => ({
  p1: getTopLeft(rect),
  p2: getTopRight(rect),
});

export const getRightSide = rect => ({
  p1: getTopRight(rect),
  p2: getBottomRight(rect),
});

export const getBottomSide = rect => ({
  p1: getBottomLeft(rect),
  p2: getBottomRight(rect),
});

export const getLefSide = rect => ({
  p1: getTopLeft(rect),
  p2: getBottomLeft(rect),
});

export const getSides = rect => ({
  top: getTopSide(rect),
  right: getRightSide(rect),
  bottom: getBottomSide(rect),
  left: getLefSide(rect),
});
