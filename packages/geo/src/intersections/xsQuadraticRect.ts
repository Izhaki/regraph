import { intersect, quadraticBezier, rectangle } from './kld';
import { Quadratic } from '../quadratic';
import { Rect } from '../rect';
import { Point } from '../point';

export const xsQuadraticRect = (quad: Quadratic, rect: Rect): Point[] =>
  intersect(quadraticBezier(quad), rectangle(rect));

export const xQuadraticRect = (quad: Quadratic, rect: Rect): Point =>
  xsQuadraticRect(quad, rect)[0];
