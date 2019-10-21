import { Line } from './Line';
import { Point } from '../point';
import getPointAtTime from './getPointAtTime';

export default (line: Line): Point => getPointAtTime(line, 0.5);
