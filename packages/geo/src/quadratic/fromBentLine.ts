import { Line, getMidPointAtDistance } from '@regraph/geo/line';
import { Quadratic } from './Quadratic';

// A quad via the point that is at the given bend value (distance)
// from the line middle.
export default (line: Line, bend: number): Quadratic => ({
  ...line,
  c1: getMidPointAtDistance(line, -2 * bend),
});
