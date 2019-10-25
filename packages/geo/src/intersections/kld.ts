/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ShapeInfo, Intersection } from 'kld-intersections';
import { Line } from '@regraph/geo/line';
import { Quadratic } from '@regraph/geo/quadratic';
import { Rect } from '@regraph/geo/rect';
import { Ellipse } from '@regraph/geo/ellipse';
import { Point } from '@regraph/geo/point';

export const intersect = (a, b): Point[] => Intersection.intersect(a, b).points;

export const kldQuadratic = (quad: Quadratic) =>
  ShapeInfo.quadraticBezier(quad.src, quad.c1, quad.dst);

export const kldRect = (rect: Rect) =>
  ShapeInfo.rectangle({
    top: rect.x,
    left: rect.y,
    width: rect.width,
    height: rect.height,
  });

export const kldEllipse = (ellipse: Ellipse) =>
  ShapeInfo.ellipse(ellipse.center.x, ellipse.center.y, ellipse.rx, ellipse.ry);

export const kldLine = (line: Line) => ShapeInfo.line(line.src, line.dst);
