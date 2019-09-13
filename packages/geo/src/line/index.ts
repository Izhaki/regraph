import { Point } from '../point';

export interface Line {
  p1: Point;
  p2: Point;
}

// eslint-disable-next-line import/prefer-default-export
export { default as getLineIntersection } from './getLineIntersection';
