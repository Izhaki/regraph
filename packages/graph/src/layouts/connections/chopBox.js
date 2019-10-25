import boxCenter from './boxCenter';
import { isRect } from '@regraph/geo/rect';
import { xLineRect } from '@regraph/geo/intersections';

export default (props, connection) => {
  const { boxes } = props;
  const { src, dst } = connection;
  const terminals = {};
  const srcBox = boxes[src.id];
  const dstBox = boxes[dst.id];

  if (!isRect(srcBox) || !isRect(dstBox)) {
    return terminals;
  }

  const line = {
    src: isRect(srcBox) ? boxCenter(srcBox) : src,
    dst: isRect(dstBox) ? boxCenter(dstBox) : dst,
  };

  terminals.src = {
    ...src,
    ...xLineRect(line, srcBox),
  };
  terminals.dst = {
    ...dst,
    ...xLineRect(line, dstBox),
  };

  return terminals;
};
