import { isEmpty } from '@regraph/core/';
import { isPoint } from '@regraph/geo/point';
import { mergeConnections } from '../../utils';
import chop from './chop';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

const layoutConnections = props =>
  props.connections.map(connection => {
    if (needsResolution(connection)) {
      const update = chop(props, connection);
      if (!isEmpty(update)) {
        return mergeConnections(connection, update);
      }
    }
    return connection;
  });

const layout = props => ({
  ...props,
  connections: layoutConnections(props),
});
layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
