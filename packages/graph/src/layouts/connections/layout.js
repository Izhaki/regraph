import { isPoint } from '@regraph/geo/point';
import { mergeConnections } from '../../utils';
import resolveAnchors from './resolveAnchors';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

const layoutConnections = props =>
  props.connections.map(connection => {
    if (needsResolution(connection)) {
      const update = resolveAnchors(props, connection);
      return mergeConnections(connection, update);
    }
    return connection;
  });

const layout = props => ({
  ...props,
  connections: layoutConnections(props),
});
layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
