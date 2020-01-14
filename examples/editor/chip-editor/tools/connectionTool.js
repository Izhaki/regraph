import { find } from '../../../../packages/editor/src/slices/utils';
import isValidConnection from '../isValidConnection';
import {
  addConnection,
  updateConnections,
  removeConnections,
} from '@regraph/editor/actions';

const getEnd = ({ id, port, type }) => ({
  id,
  port: port.id,
  anchor: type === 'input' ? 'left' : 'right',
});

const getEndId = end => `${end.id}/${end.port}`;
const generateId = ({ src, dst }) => `${getEndId(src)}->${getEndId(dst)}`;

export default ({ getState }) => {
  let source = null;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { connections } = getState();
        const { target } = action.event;
        source = target;
        const isValid = isValidConnection(source, target, connections);

        const [from, to] =
          source.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
        const end = getEnd(source);

        return next(
          addConnection({
            id: '@@draggedConnection',
            [from]: end,
            [to]: isValid ? end : action.event.position,
          })
        );
      }

      case 'mouseMove': {
        const state = getState();
        const isValid = isValidConnection(
          source,
          action.event.target,
          state.connections
        );

        const end = source.type === 'output' ? 'dst' : 'src';

        return next(
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              [end]: isValid
                ? getEnd(action.event.target)
                : action.event.position,
            },
          })
        );
      }

      case 'mouseUp': {
        const state = getState();
        const isValid = isValidConnection(
          source,
          action.event.target,
          state.connections
        );

        if (!isValid) {
          return next(
            removeConnections({
              ids: ['@@draggedConnection'],
            })
          );
        }

        const connection = find(state.connections, '@@draggedConnection');
        return next(
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              id: generateId(connection),
              overlay: true,
            },
          })
        );
      }
      default:
    }

    return next(action);
  };
};
