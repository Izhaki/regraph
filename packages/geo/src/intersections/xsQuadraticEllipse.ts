import { Quadratic } from '@regraph/geo/quadratic';
import { Ellipse } from '@regraph/geo/ellipse';
import { Point } from '@regraph/geo/point';
import { intersect, quadraticBezier, ellipse } from './kld';

export const xsQuadraticEllipse = (quad: Quadratic, elli: Ellipse): Point[] =>
  intersect(quadraticBezier(quad), ellipse(elli));

export const xQuadraticEllipse = (quad: Quadratic, elli: Ellipse): Point =>
  xsQuadraticEllipse(quad, elli)[0];
