/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ShapeInfo, Intersection } from 'kld-intersections';
import { Quadratic } from '../quadratic';
import { Rect } from '../rect';
import { Point } from '../point';

export const quadraticBezier = (quad: Quadratic) =>
  ShapeInfo.quadraticBezier(quad.src, quad.c1, quad.dst);

export const rectangle = (rect: Rect) =>
  ShapeInfo.rectangle({
    top: rect.x,
    left: rect.y,
    width: rect.width,
    height: rect.height,
  });

export const intersect = (a, b): Point[] => Intersection.intersect(a, b).points;
