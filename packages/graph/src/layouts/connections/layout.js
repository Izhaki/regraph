import terminalBoxes from './terminalBoxes';
import { isEmpty } from '@regraph/core/';

const layoutConnections = (props, resolveTerminals) =>
  props.connections.reduce((connections, connection) => {
    const terminals = resolveTerminals(props, connection);
    if (!isEmpty(terminals)) {
      connections.push({ ...connection, ...terminals });
    } else {
      connections.push(connection);
    }
    return connections;
  }, []);

export default (resolveTerminals = terminalBoxes()) => {
  const layout = props => ({
    ...props,
    connections: layoutConnections(props, resolveTerminals),
  });
  layout.deps = ({ boxes, connections }) => [boxes, connections];
  return layout;
};
