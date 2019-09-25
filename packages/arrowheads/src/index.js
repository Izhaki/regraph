import withMarker from './withMarker';
import Triangle from './Triangle';
import Chevy from './Chevy';
import Perp from './Perp';

export const TriangleMarker = withMarker(Triangle);
export const ChevyMarker = withMarker(Chevy);
export const PerpMarker = withMarker(Perp);

export { Triangle, Chevy, Perp };
