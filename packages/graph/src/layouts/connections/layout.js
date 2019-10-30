import terminalBoxes from './terminalBoxes';
import { isEmpty } from '@regraph/core/';
import { isPoint } from '@regraph/geo/point';
import { mergeConnections } from '../../utils';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

const layoutConnections = (props, resolveTerminals) =>
  props.connections.map(connection => {
    if (needsResolution(connection)) {
      const update = resolveTerminals(props, connection);
      if (!isEmpty(update)) {
        return mergeConnections(connection, update);
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
