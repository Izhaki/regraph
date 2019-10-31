import { getCenter } from '@regraph/geo/rect';
import { fromRect as ellipseFromRect } from '@regraph/geo/ellipse';
import {
  xLineRect,
  xQuadraticRect,
  xQuadraticEllipse,
  xLineEllipse,
} from '@regraph/geo/intersections';
import { mergeConnections } from '../../utils';

const anchorMap = {
  'chop-box': {
    xMap: {
      quad: xQuadraticRect,
      line: xLineRect,
    },
    fromRect: x => x,
  },
  'chop-ellipse': {
    xMap: {
      quad: xQuadraticEllipse,
      line: xLineEllipse,
    },
    fromRect: ellipseFromRect,
  },
};

export default ({ boxes }, connection) => {
  const { src, dst } = connection;

  const srcFn = anchorMap[src.anchor || 'chop-box'];
  const dstFn = anchorMap[dst.anchor || 'chop-box'];

  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];
  const clone = mergeConnections(connection, {});

  clone.src = getCenter(srcBox);
  clone.dst = getCenter(dstBox);

  const { getShape } = connection.type;
  const shape = getShape(clone);

  const srcIntersect = srcFn.xMap[shape.type];
  const dstIntersect = dstFn.xMap[shape.type];

  clone.src = srcIntersect(shape, srcFn.fromRect(srcBox));
  clone.dst = dstIntersect(shape, dstFn.fromRect(dstBox));

  shape.src = clone.src;
  shape.dst = clone.dst;

  clone.shape = shape;

  return clone;
};
