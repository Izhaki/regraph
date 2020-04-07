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

import isValidConnectionConnectionBase from './isValidConnection';
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

const newConnectionPolicy = (dispatch, getState, isValidConnection) => ({
  start: event => {
    const { source, target } = event;
    const [from, to] =
      target.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
    const end = getEnd(target);

    dispatch(
      addConnection({
        id: '@@draggedConnection',
        [from]: end,
        [to]: isValidConnection(source, target) ? end : event.position,
      })
    );
  },
  drag: event => {
    const end = event.source.type === 'output' ? 'dst' : 'src';
    dispatch(
      updateConnections({
        ids: ['@@draggedConnection'],
        updates: {
          [end]: isValidConnection(event.source, event.target)
            ? getEnd(event.target)
            : event.position,
        },
      })
    );
  },
  end: event => {
    const state = getState();
    const { source, target } = event;
    if (isValidConnection(source, target)) {
      const connection = getConnectionById(state, '@@draggedConnection');
      dispatch(
        updateConnections({
          ids: ['@@draggedConnection'],
          updates: targetifyConnection({
            id: generateId(connection),
          }),
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
});

const markValidPortsPolicy = (dispatch, getState, isValidConnection) => ({
  start: event => {
    const state = getState();
    const { source } = event;
    const nextNodes = markValidPorts(state, source, isValidConnection);
    dispatch(setNodes(nextNodes));
  },
  end: () => {
    const { nodes } = getState();
    const nextNodes = unmarkValidPorts(nodes);
    dispatch(setNodes(nextNodes));
  },
});

const undoConnectionPolicy = (dispatch, beforeState, isValidConnection) => ({
  end: event => {
    const { source, target } = event;
    if (isValidConnection(source, target)) {
      dispatch(
        addCommand({
          title: 'New Connection',
          beforeState,
        })
      );
    }
  },
});

const moveBoxPolicy = dispatch => ({
  drag: event => {
    dispatch(
      moveBox({
        id: event.source.id,
        delta: event.delta,
      })
    );
  },
});

const undoMoveBoxPolicy = (dispatch, beforeState) => {
  let hasMoved = false;
  return {
    drag: () => {
      hasMoved = true;
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
    },
  };
};

const port = {
  connection: (dispatch, getState) => {
    const beforeState = getState();
    const { connections } = beforeState;

    const isValidConnection = (source, target) =>
      isValidConnectionConnectionBase(source, target, connections);
    return [
      markValidPortsPolicy(dispatch, getState, isValidConnection),
      newConnectionPolicy(dispatch, getState, isValidConnection),
      undoConnectionPolicy(dispatch, beforeState, isValidConnection),
    ];
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
      const beforeState = getState();
      return [
        moveBoxPolicy(dispatch),
        undoMoveBoxPolicy(dispatch, beforeState),
      ];
    },
  },
  output: port,
  input: port,
};

export default target => editPolicies[target.type];
