import { Line } from './Line';

export interface SvgLineCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default (line: Line): SvgLineCoordinates => ({
  x1: line.src.x,
  y1: line.src.y,
  x2: line.dst.x,
  y2: line.dst.y,
});
