import { connectionLayout } from '@regraph/graph/';
import { getCenter } from '@regraph/geo/rect';
import { fromBentLine } from '@regraph/geo/quadratic';
import { fromRect } from '@regraph/geo/ellipse';
import { xQuadraticEllipse, xLineRect } from '@regraph/geo/intersections';

const resolveTerminals = ({ boxes }, connection) => {
  const { src, dst, bend = 0 } = connection;

  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  const line = {
    src: getCenter(srcBox),
    dst: getCenter(dstBox),
  };

  if (bend) {
    const quad = fromBentLine(line, bend);
    return {
      src: xQuadraticEllipse(quad, fromRect(srcBox)),
      c1: quad.c1,
      dst: xQuadraticEllipse(quad, fromRect(dstBox)),
    };
  }
  return {
    src: xLineRect(line, srcBox),
    dst: xLineRect(line, dstBox),
  };
};

export default connectionLayout(resolveTerminals);
