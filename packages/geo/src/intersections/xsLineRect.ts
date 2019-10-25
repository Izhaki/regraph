import { Line } from '@regraph/geo/line';
import { Rect } from '@regraph/geo/rect';
import { Point } from '@regraph/geo/point';
import { intersect, kldLine, kldRect } from './kld';

export const xsLineRect = (line: Line, rect: Rect): Point[] =>
  intersect(kldLine(line), kldRect(rect));

export const xLineRect = (line: Line, rect: Rect): Point =>
  xsLineRect(line, rect)[0];
