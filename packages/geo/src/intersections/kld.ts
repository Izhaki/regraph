/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ShapeInfo, Intersection } from 'kld-intersections';
import { Quadratic } from '@regraph/geo/quadratic';
import { Rect } from '@regraph/geo/rect';
import { Ellipse } from '@regraph/geo/ellipse';
import { Point } from '@regraph/geo/point';

export const quadraticBezier = (quad: Quadratic) =>
  ShapeInfo.quadraticBezier(quad.src, quad.c1, quad.dst);

export const rectangle = (rect: Rect) =>
  ShapeInfo.rectangle({
    top: rect.x,
    left: rect.y,
    width: rect.width,
    height: rect.height,
  });

export const ellipse = (elli: Ellipse) =>
  ShapeInfo.ellipse(elli.center.x, elli.center.y, elli.rx, elli.ry);

export const intersect = (a, b): Point[] => Intersection.intersect(a, b).points;
