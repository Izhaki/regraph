import { uuid } from '@regraph/core/';
import {
  addConnection,
  removeConnections,
  updateConnections,
  addBox,
  addNode,
  moveBox,
} from '@regraph/editor/actions';
import { getConnectionById } from '@regraph/editor/selectors';
import { getUniqueId } from '@regraph/connections';

const isValidConnection = (src, dst) =>
  Boolean(src && dst && src.id && dst.id && src.id !== dst.id);

const getEnd = ({ id }) => ({ id });

const editPolicies = {
  background: {
    create(event) {
      const id = uuid();
      const { position } = event;
      return [
        addBox({
          id,
          box: {
            x: position.x - 15,
            y: position.y - 15,
            width: 30,
            height: 30,
          },
        }),
        addNode({ id }),
      ];
    },
  },
  node: {
    move: {
      drag: event =>
        moveBox({
          id: event.source.id,
          delta: event.delta,
        }),
    },
    connection: {
      start(event) {
        const { source, target } = event;
        const isValid = isValidConnection(source, target);
        const src = getEnd(target);

        return [
          addConnection({
            id: '@@draggedConnection',
            src,
            dst: isValid ? src : event.position,
          }),
        ];
      },
      drag(event) {
        const isValid = isValidConnection(event.source, event.target);
        return updateConnections({
          ids: ['@@draggedConnection'],
          updates: {
            dst: isValid ? getEnd(event.target) : event.position,
          },
        });
      },
      end(event, state) {
        const isValid = isValidConnection(event.source, event.target);
        const actions = [];
        if (isValid) {
          const connection = getConnectionById(state, '@@draggedConnection');

          actions.push(
            updateConnections({
              ids: ['@@draggedConnection'],
              updates: {
                id: getUniqueId(connection, state.connections),
              },
            })
          );
        } else {
          actions.push(
            removeConnections({
              ids: ['@@draggedConnection'],
            })
          );
        }

        return actions;
      },
    },
  },
};

export default target => editPolicies[target.type] || {};
