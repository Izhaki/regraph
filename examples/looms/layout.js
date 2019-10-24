import { connectionLayout } from '@regraph/graph/';
import { getCenter } from '@regraph/geo/rect';
import { fromBentLine } from '@regraph/geo/quadratic';
import { xQuadraticRect } from '@regraph/geo/intersections';

const resolveTerminals = ({ boxes }, connection) => {
  const { src, dst, bend = 0 } = connection;

  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  const centers = {
    src: getCenter(srcBox),
    dst: getCenter(dstBox),
  };

  const quad = fromBentLine(centers, bend);

  return {
    src: xQuadraticRect(quad, srcBox),
    c1: quad.c1,
    dst: xQuadraticRect(quad, dstBox),
  };
};

export default connectionLayout(resolveTerminals);
