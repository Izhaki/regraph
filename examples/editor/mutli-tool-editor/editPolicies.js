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
    create: dispatch => event => {
      const id = uuid();
      const { position } = event;
      [
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
      ].map(dispatch);
    },
  },
  node: {
    move: dispatch => ({
      drag: event => {
        dispatch(
          moveBox({
            id: event.source.id,
            delta: event.delta,
          })
        );
      },
    }),
    connection: (dispatch, getState) => ({
      start: event => {
        const { source, target } = event;
        const isValid = isValidConnection(source, target);
        const src = getEnd(target);

        dispatch(
          addConnection({
            id: '@@draggedConnection',
            src,
            dst: isValid ? src : event.position,
          })
        );
      },
      drag: event => {
        const isValid = isValidConnection(event.source, event.target);
        dispatch(
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              dst: isValid
                ? getEnd(event.target)
                : { ...event.position, id: undefined },
            },
          })
        );
      },
      end: event => {
        const isValid = isValidConnection(event.source, event.target);
        if (isValid) {
          const state = getState();
          const connection = getConnectionById(state, '@@draggedConnection');

          dispatch(
            updateConnections({
              ids: ['@@draggedConnection'],
              updates: {
                id: getUniqueId(connection, state.connections),
              },
            })
          );
        } else {
          dispatch(
            removeConnections({
              ids: ['@@draggedConnection'],
            })
          );
        }
      },
    }),
  },
};

export default target => editPolicies[target.type];
