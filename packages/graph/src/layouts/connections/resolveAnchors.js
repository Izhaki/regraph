import { isPoint } from '@regraph/geo/point';
import { transpose } from '@regraph/geo/rect';
import resolvers from './anchorResolvers';

const doIntersect = ({ intersect, fromRect }, connectionShape, box) => {
  const nodeShape = fromRect(box);
  return intersect[connectionShape.type](connectionShape, nodeShape);
};

const noIntersection = result => result === undefined;

export default ({ boxes }, connection) => {
  const getBox = ({ id, port }) => {
    if (port) {
      const box = boxes[`${id}/${port}`];
      const parentBox = boxes[id];
      return transpose({ ...box }, parentBox);
    }
    return boxes[id];
  };

  const updates = {};
  const { src, dst } = connection;

  const srcIsPoint = isPoint(src);
  const srcBox = getBox(src);
  const srcResolver = resolvers[src.anchor || 'chop-box'];

  const dstIsPoint = isPoint(dst);
  const dstBox = getBox(dst);
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
      if (noIntersection(updates.src)) {
        return undefined;
      }
    }

    if (dstNeedsIntersection) {
      updates.dst = doIntersect(dstResolver, connectionShape, dstBox);
      if (noIntersection(updates.dst)) {
        return undefined;
      }
    }

    // Keep the shape in the connection so no need to recalculate later.
    connectionShape.src = updates.src;
    connectionShape.dst = updates.dst;
    updates.shape = connectionShape;
  }

  return updates;
};
