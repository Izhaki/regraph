import { transpose } from '@regraph/geo/rect';
import resolvers from './anchorResolvers';
import { endNeedsResolution } from './utils';

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

  const srcNeedResolution = endNeedsResolution(src);
  const srcBox = getBox(src);
  const srcResolver = resolvers[src.anchor || 'chop-box'];

  const dstNeedResolution = endNeedsResolution(dst);
  const dstBox = getBox(dst);
  const dstResolver = resolvers[dst.anchor || 'chop-box'];

  // Anchor

  if (srcNeedResolution) {
    updates.src = srcResolver.getAnchor(srcBox);
  }

  if (dstNeedResolution) {
    updates.dst = dstResolver.getAnchor(dstBox);
  }

  // Intersection

  const srcNeedsIntersection = srcNeedResolution && srcResolver.intersect;
  const dstNeedsIntersection = dstNeedResolution && dstResolver.intersect;

  if (srcNeedsIntersection || dstNeedsIntersection) {
    const { getShape } = connection.type;
    const connectionShape = getShape({
      ...connection,
      src: updates.src || src,
      dst: updates.dst || dst,
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
  }

  return updates;
};
