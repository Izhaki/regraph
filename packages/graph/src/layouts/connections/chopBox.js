import boxCenter from './boxCenter';
import { isObject } from '@regraph/core/';
import { isRect, getIntersectionCenterToPoint } from '@regraph/geo/rect';

const getEnds = ({ src, dst }) => ({
  src: isObject(src) ? src : { id: src },
  dst: isObject(dst) ? dst : { id: dst },
});

export default (props, connection) => {
  const { boxes } = props;
  const { src, dst } = getEnds(connection);
  const terminals = {};
  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  if (!isRect(srcBox) || !isRect(dstBox)) {
    return terminals;
  }

  const srcPoint = isRect(srcBox) ? boxCenter(srcBox) : src;
  const dstPoint = isRect(dstBox) ? boxCenter(dstBox) : dst;

  terminals.src = {
    ...src,
    ...getIntersectionCenterToPoint(srcBox, dstPoint),
  };
  terminals.dst = {
    ...dst,
    ...getIntersectionCenterToPoint(dstBox, srcPoint),
  };

  return terminals;
};
