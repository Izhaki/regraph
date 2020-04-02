import { uuid } from '@regraph/core/';
import {
  addNode,
  setNodes,
  updateNodes,
  removeNodes,
  addConnection,
  removeConnections,
  updateConnections,
  addBox,
  moveBox,
  addCommand,
} from '@regraph/editor/actions';

import {
  getConnectionById,
  getNodeConnectionsIds,
} from '@regraph/editor/selectors';

import isValidConnection from './isValidConnection';
import { markValidPorts, unmarkValidPorts } from './markValidPorts';
import { targetifyNode, targetifyConnection } from './targetify';

const getEndId = end => `${end.id}/${end.port}`;
const generateId = ({ src, dst }) => `${getEndId(src)}->${getEndId(dst)}`;

const setSelection = (action, selected) => dispatch => target => {
  dispatch(action({ ids: [target.id], updates: { selected } }));
};

const getEnd = ({ id, port, type }) => ({
  id,
  port: port.id,
  anchor: type === 'input' ? 'left' : 'right',
});

const port = {
  connection: (dispatch, getState) => {
    let beforeState;
    return {
      start: event => {
        const state = getState();
        beforeState = state;
        const { connections } = state;
        const { source, target } = event;
        const nextNodes = markValidPorts(state, source);
        const isValid = isValidConnection(source, target, connections);
        const [from, to] =
          target.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
        const end = getEnd(target);

        [
          setNodes(nextNodes),
          addConnection({
            id: '@@draggedConnection',
            [from]: end,
            [to]: isValid ? end : event.position,
          }),
        ].map(dispatch);
      },
      drag: event => {
        const { connections } = getState();
        const isValid = isValidConnection(
          event.source,
          event.target,
          connections
        );
        const end = event.source.type === 'output' ? 'dst' : 'src';
        dispatch(
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              [end]: isValid ? getEnd(event.target) : event.position,
            },
          })
        );
      },
      end: event => {
        const state = getState();
        const { connections, nodes } = state;
        const isValid = isValidConnection(
          event.source,
          event.target,
          connections
        );
        const nextNodes = unmarkValidPorts(nodes);
        dispatch(setNodes(nextNodes));
        if (isValid) {
          const connection = getConnectionById(state, '@@draggedConnection');
          [
            updateConnections({
              ids: ['@@draggedConnection'],
              updates: targetifyConnection({
                id: generateId(connection),
              }),
            }),
            addCommand({
              title: 'New Connection',
              beforeState,
            }),
          ].map(dispatch);
        } else {
          dispatch(
            removeConnections({
              ids: ['@@draggedConnection'],
            })
          );
        }

        beforeState = null;
      },
    };
  },
};

const editPolicies = {
  connection: {
    select: setSelection(updateConnections, true),
    deselect: setSelection(updateConnections, false),
    delete: dispatch => target => {
      dispatch(removeConnections({ ids: [target.id] }));
    },
  },
  node: {
    new: (dispatch, getState) => node => {
      const newNode = targetifyNode({
        ...node,
        id: node.id || uuid(),
      });
      [
        addBox({ id: newNode.id, box: { x: 20, y: 20 } }),
        addNode(newNode),
        addCommand({
          title: 'New Node',
          beforeState: getState(),
        }),
      ].map(dispatch);
    },
    select: setSelection(updateNodes, true),
    deselect: setSelection(updateNodes, false),
    delete: (dispatch, getState) => target => {
      [
        removeNodes({ ids: [target.id] }),
        removeConnections({
          ids: getNodeConnectionsIds(getState(), target.id),
        }),
      ].map(dispatch);
    },
    move: (dispatch, getState) => {
      let beforeState;
      let hasMoved = false;
      return {
        start: () => {
          beforeState = getState();
        },
        drag: event => {
          hasMoved = true;
          dispatch(
            moveBox({
              id: event.source.id,
              delta: event.delta,
            })
          );
        },
        end: () => {
          if (hasMoved) {
            dispatch(
              addCommand({
                title: 'Move',
                beforeState,
              })
            );
          }
          return undefined;
        },
      };
    },
  },
  output: port,
  input: port,
};

export default target => editPolicies[target.type] || {};
