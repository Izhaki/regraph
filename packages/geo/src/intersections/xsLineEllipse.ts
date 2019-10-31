import { Line } from '@regraph/geo/line';
import { Ellipse } from '@regraph/geo/ellipse';
import { Point } from '@regraph/geo/point';
import { intersect, kldLine, kldEllipse } from './kld';

export const xsLineEllipse = (line: Line, ellipse: Ellipse): Point[] =>
  intersect(kldLine(line), kldEllipse(ellipse));

export const xLineEllipse = (line: Line, ellipse: Ellipse): Point =>
  xsLineEllipse(line, ellipse)[0];
