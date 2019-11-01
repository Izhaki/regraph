import {
  getCenter,
  getTopMid,
  getRightMid,
  getBottomMid,
  getLeftMid,
} from '@regraph/geo/rect';
import { fromRect as ellipseFromRect } from '@regraph/geo/ellipse';
import {
  xLineRect,
  xQuadraticRect,
  xQuadraticEllipse,
  xLineEllipse,
} from '@regraph/geo/intersections';

export default {
  'chop-box': {
    getAnchor: getCenter,
    intersect: {
      quad: xQuadraticRect,
      line: xLineRect,
    },
    fromRect: rect => rect,
  },
  'chop-ellipse': {
    getAnchor: getCenter,
    intersect: {
      quad: xQuadraticEllipse,
      line: xLineEllipse,
    },
    fromRect: ellipseFromRect,
  },
  center: {
    getAnchor: getCenter,
  },
  top: {
    getAnchor: getTopMid,
  },
  right: {
    getAnchor: getRightMid,
  },
  bottom: {
    getAnchor: getBottomMid,
  },
  left: {
    getAnchor: getLeftMid,
  },
};
