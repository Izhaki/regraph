import boxCenter from './boxCenter';
import { isObject } from '@regraph/core/';
import { isRect } from '@regraph/geo/rect';

const getEnds = ({ src, dst }) => ({
  src: isObject(src) ? src : { id: src },
  dst: isObject(dst) ? dst : { id: dst },
});

export default (getMagnet = boxCenter) => (props, connection) => {
  const { boxes } = props;
  const { src, dst } = getEnds(connection);
  const terminals = {};
  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  if (isRect(srcBox)) {
    terminals.src = {
      ...src,
      ...getMagnet(srcBox),
    };
  }
  if (isRect(dstBox)) {
    terminals.dst = {
      ...dst,
      ...getMagnet(dstBox),
    };
  }
  return terminals;
};
