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

const isValidConnection = (src, dst) =>
  Boolean(src && dst && src.id && dst.id && src.id !== dst.id);
const generateId = ({ src, dst }, connections) => {
  const id = `${src.id}->${dst.id}`;
  const similarCount = connections.filter(con => con.id === id).length;
  return similarCount ? `${similarCount}.${id}` : id;
};

const getEnd = ({ id }) => ({ id });

const editPolicies = {
  background: {
    select(target, event) {
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
      drag(target, event) {
        return moveBox({
          id: target.id,
          delta: event.delta,
        });
      },
    },
    connection() {
      let source;
      return {
        start(event) {
          const { target } = event;
          source = target;
          const isValid = isValidConnection(source, target);
          const end = getEnd(target);

          return [
            addConnection({
              id: '@@draggedConnection',
              src: end,
              dst: isValid ? end : event.position,
            }),
          ];
        },
        drag(event) {
          const isValid = isValidConnection(source, event.target);
          return updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              dst: isValid ? getEnd(event.target) : event.position,
            },
          });
        },
        end(event, state) {
          const isValid = isValidConnection(source, event.target);
          const actions = [];
          if (isValid) {
            const connection = getConnectionById(state, '@@draggedConnection');

            actions.push(
              updateConnections({
                ids: ['@@draggedConnection'],
                updates: {
                  id: generateId(connection, state.connections),
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
      };
    },
  },
};

export default target => editPolicies[target.type] || {};
