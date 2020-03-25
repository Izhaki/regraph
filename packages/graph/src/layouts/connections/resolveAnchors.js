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

  const srcBox = getBox(src);
  const srcResolver = resolvers[src.anchor || 'chop-box'];

  const dstBox = getBox(dst);
  const dstResolver = resolvers[dst.anchor || 'chop-box'];

  // Anchor

  updates.src = srcResolver.getAnchor(srcBox);
  updates.dst = dstResolver.getAnchor(dstBox);

  // Intersection

  if (srcResolver.intersect || dstResolver.intersect) {
    const { getShape } = connection.type;
    const connectionShape = getShape({
      ...connection,
      src: updates.src || src,
      dst: updates.dst || dst,
    });

    if (srcResolver.intersect) {
      updates.src = doIntersect(srcResolver, connectionShape, srcBox);
      if (noIntersection(updates.src)) {
        return undefined;
      }
    }

    if (dstResolver.intersect) {
      updates.dst = doIntersect(dstResolver, connectionShape, dstBox);
      if (noIntersection(updates.dst)) {
        return undefined;
      }
    }
  }

  return updates;
};
