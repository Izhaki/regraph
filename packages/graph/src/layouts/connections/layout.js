import terminalBoxes from './terminalBoxes';
import { isEmpty } from '../../utils';

const layoutConnections = (props, resolveTerminals) =>
  props.connections.reduce((connections, connection) => {
    const terminals = resolveTerminals(props, connection);
    if (!isEmpty(terminals)) {
      connections.push({ ...connection, ...terminals });
    }
    return connections;
  }, []);

export default (resolveTerminals = terminalBoxes()) => props => {
  return {
    ...props,
    connections: layoutConnections(props, resolveTerminals),
  };
};
