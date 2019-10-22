import { intersect, quadraticBezier, rectangle } from './kld';
import { Quadratic } from '../quadratic';
import { Rect } from '../rect';
import { Point } from '../point';

export default (quad: Quadratic, rect: Rect): Point[] =>
  intersect(quadraticBezier(quad), rectangle(rect));
