import boxCenter from './boxCenter';
import { isRect } from '@regraph/geo/rect';

export default (getMagnet = boxCenter) => (props, connection) => {
  const { boxes } = props;
  const { src, dst } = connection;
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
