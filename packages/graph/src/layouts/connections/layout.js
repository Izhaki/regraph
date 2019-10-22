import terminalBoxes from './terminalBoxes';
import { isEmpty } from '@regraph/core/';
import { isPoint } from '@regraph/geo/point';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

const layoutConnections = (props, resolveTerminals) =>
  props.connections.map(connection => {
    if (needsResolution(connection)) {
      const terminals = resolveTerminals(props, connection);
      if (!isEmpty(terminals)) {
        return { ...connection, ...terminals };
      }
    }
    return connection;
  });

export default (resolveTerminals = terminalBoxes()) => {
  const layout = props => ({
    ...props,
    connections: layoutConnections(props, resolveTerminals),
  });
  layout.deps = ({ boxes, connections }) => [boxes, connections];
  return layout;
};
