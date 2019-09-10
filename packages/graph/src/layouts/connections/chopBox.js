import boxCenter from './boxCenter';
import { isRect, getIntersectionCenterToPoint } from '@regraph/geo/rect';

const isId = value => typeof value === 'string';

export default (props, connection) => {
  const { boxes } = props;
  const { src, dst } = connection;
  const terminals = {};
  const srcBox = boxes[src];
  const dstBox = boxes[dst];

  if (!isRect(srcBox) || !isRect(dstBox)) {
    return terminals;
  }

  const srcPoint = isId(src) ? boxCenter(srcBox) : src;
  const dstPoint = isId(dst) ? boxCenter(dstBox) : dst;

  terminals.src = getIntersectionCenterToPoint(srcBox, dstPoint);
  terminals.dst = getIntersectionCenterToPoint(dstBox, srcPoint);

  return terminals;
};
