import { Point } from '@regraph/geo/point';
import Line from './Line';
import getPointAtTime from './getPointAtTime';

export default (line: Line): Point => getPointAtTime(line, 0.5);
