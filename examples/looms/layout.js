import { connectionLayout } from '@regraph/graph/';
import { getCenter } from '@regraph/geo/rect';
import { getMidPointAtDistance } from '@regraph/geo/line';
import { xQuadraticRect } from '@regraph/geo/intersections';

const resolveTerminals = ({ boxes }, connection) => {
  const { src, dst, bend = 0 } = connection;

  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  const centers = {
    src: getCenter(srcBox),
    dst: getCenter(dstBox),
  };

  const quad = {
    ...centers,
    c1: getMidPointAtDistance(centers, -2 * bend),
  };

  return {
    src: xQuadraticRect(quad, srcBox),
    dst: xQuadraticRect(quad, dstBox),
  };
};

export default connectionLayout(resolveTerminals);
