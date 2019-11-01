import { isPoint } from '@regraph/geo/point';
import resolvers from './anchorResolvers';

const doIntersect = ({ intersect, fromRect }, connectionShape, box) => {
  const nodeShape = fromRect(box);
  return intersect[connectionShape.type](connectionShape, nodeShape);
};

export default ({ boxes }, connection) => {
  const updates = {};
  const { src, dst } = connection;

  const srcIsPoint = isPoint(src);
  const srcBox = boxes[src.id];
  const srcResolver = resolvers[src.anchor || 'chop-box'];

  const dstIsPoint = isPoint(dst);
  const dstBox = boxes[dst.id];
  const dstResolver = resolvers[dst.anchor || 'chop-box'];

  // Anchor

  if (!srcIsPoint) {
    updates.src = srcResolver.getAnchor(srcBox);
  }

  if (!dstIsPoint) {
    updates.dst = dstResolver.getAnchor(dstBox);
  }

  // Intersection

  const srcNeedsIntersection = !srcIsPoint && srcResolver.intersect;
  const dstNeedsIntersection = !dstIsPoint && dstResolver.intersect;

  if (srcNeedsIntersection || dstNeedsIntersection) {
    const { getShape } = connection.type;
    const connectionShape = getShape({
      ...connection,
      src: updates.src,
      dst: updates.dst,
    });

    if (srcNeedsIntersection) {
      updates.src = doIntersect(srcResolver, connectionShape, srcBox);
    }

    if (dstNeedsIntersection) {
      updates.dst = doIntersect(dstResolver, connectionShape, dstBox);
    }

    // Keep the shape in the connection so no need to recalculate later.
    connectionShape.src = updates.src;
    connectionShape.dst = updates.dst;
    updates.shape = connectionShape;
  }

  return updates;
};
