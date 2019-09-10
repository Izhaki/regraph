import boxCenter from './boxCenter';
import { isRect } from '@regraph/geo/rect';

const isId = value => typeof value === 'string';

export default (getMagnet = boxCenter) => (props, connection) => {
  const { boxes } = props;
  const { src, dst } = connection;
  const terminals = {};
  if (isId(src) && isRect(boxes[src])) {
    terminals.src = getMagnet(boxes[src]);
  }
  if (isId(dst) && isRect(boxes[dst])) {
    terminals.dst = getMagnet(boxes[dst]);
  }
  return terminals;
};
