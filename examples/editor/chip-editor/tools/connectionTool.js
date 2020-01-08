import { find } from '../../../../packages/editor/src/slices/utils';
import getDomainMeta from '../getDomainMeta';
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
  let srcMeta = null;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const { connections } = getState();
        const dstMeta = action.meta;
        srcMeta = dstMeta;
        const isValid = isValidConnection(srcMeta, dstMeta, connections);

        const [from, to] =
          srcMeta.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
        const end = getEnd(srcMeta);

        return next(
          addConnection({
            id: '@@draggedConnection',
            [from]: end,
            [to]: isValid ? end : action.event.getPosition(),
          })
        );
      }

      case 'drag': {
        const state = getState();
        const dstMeta = getDomainMeta(action.event.target, state);
        const isValid = isValidConnection(srcMeta, dstMeta, state.connections);

        const end = srcMeta.type === 'output' ? 'dst' : 'src';

        return next(
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              [end]: isValid ? getEnd(dstMeta) : action.event.getPosition(),
            },
          })
        );
      }

      case 'dragEnd': {
        const state = getState();
        const dstMeta = getDomainMeta(action.event.target, state);
        const isValid = isValidConnection(srcMeta, dstMeta, state.connections);

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
