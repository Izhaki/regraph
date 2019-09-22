import { Point } from '../point';

export interface Line {
  src: Point;
  dst: Point;
}

// eslint-disable-next-line import/prefer-default-export
export { default as getLineIntersection } from './getLineIntersection';
