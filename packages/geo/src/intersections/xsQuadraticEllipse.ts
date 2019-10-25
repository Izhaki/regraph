import { Quadratic } from '@regraph/geo/quadratic';
import { Ellipse } from '@regraph/geo/ellipse';
import { Point } from '@regraph/geo/point';
import { intersect, kldQuadratic, kldEllipse } from './kld';

export const xsQuadraticEllipse = (
  quad: Quadratic,
  ellipse: Ellipse
): Point[] => intersect(kldQuadratic(quad), kldEllipse(ellipse));

export const xQuadraticEllipse = (quad: Quadratic, ellipse: Ellipse): Point =>
  xsQuadraticEllipse(quad, ellipse)[0];
