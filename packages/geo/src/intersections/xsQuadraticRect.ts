import { Quadratic } from '@regraph/geo/quadratic';
import { Rect } from '@regraph/geo/rect';
import { Point } from '@regraph/geo/point';
import { intersect, kldQuadratic, kldRect } from './kld';

export const xsQuadraticRect = (quad: Quadratic, rect: Rect): Point[] =>
  intersect(kldQuadratic(quad), kldRect(rect));

export const xQuadraticRect = (quad: Quadratic, rect: Rect): Point =>
  xsQuadraticRect(quad, rect)[0];
