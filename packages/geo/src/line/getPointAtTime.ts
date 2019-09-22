import { Line } from './Line';
import { Point } from '../point';

// AKA `lerp` - Linear interpolation
export default (line: Line, time: number): Point => ({
  x: (1 - time) * line.src.x + time * line.dst.x,
  y: (1 - time) * line.src.y + time * line.dst.y,
});
