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

const setSelection = (action, selected) => target =>
  action({ ids: [target.id], updates: { selected } });

const getEnd = ({ id, port, type }) => ({
  id,
  port: port.id,
  anchor: type === 'input' ? 'left' : 'right',
});

const port = {
  connection: () => {
    let source;
    let beforeState;
    return {
      start: (event, state) => {
        beforeState = state;
        const { connections } = state;
        const { target } = event;
        source = target;
        const nextNodes = markValidPorts(state, source);
        const isValid = isValidConnection(source, target, connections);
        const [from, to] =
          target.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
        const end = getEnd(target);

        return [
          setNodes(nextNodes),
          addConnection({
            id: '@@draggedConnection',
            [from]: end,
            [to]: isValid ? end : event.position,
          }),
        ];
      },
      drag: (event, { connections }) => {
        const isValid = isValidConnection(source, event.target, connections);
        const end = source.type === 'output' ? 'dst' : 'src';
        return updateConnections({
          ids: ['@@draggedConnection'],
          updates: {
            [end]: isValid ? getEnd(event.target) : event.position,
          },
        });
      },
      end: (event, state) => {
        const { connections, nodes } = state;
        const isValid = isValidConnection(source, event.target, connections);
        const nextNodes = unmarkValidPorts(nodes);
        const actions = [setNodes(nextNodes)];
        if (isValid) {
          const connection = getConnectionById(state, '@@draggedConnection');
          actions.push(
            updateConnections({
              ids: ['@@draggedConnection'],
              updates: {
                id: generateId(connection),
                ...targetifyConnection(connection),
              },
            }),
            addCommand({
              title: 'New Connection',
              beforeState,
            })
          );
        } else {
          actions.push(
            removeConnections({
              ids: ['@@draggedConnection'],
            })
          );
        }

        beforeState = null;
        return actions;
      },
    };
  },
};

const editPolicies = {
  connection: {
    select: setSelection(updateConnections, true),
    deselect: setSelection(updateConnections, false),
    delete: target => removeConnections({ ids: [target.id] }),
  },
  node: {
    new: (node, state) => {
      const newNode = targetifyNode({
        ...node,
        id: node.id || uuid(),
      });
      return [
        addBox({ id: newNode.id, box: { x: 20, y: 20 } }),
        addNode(newNode),
        addCommand({
          title: 'New Node',
          beforeState: state,
        }),
      ];
    },
    select: setSelection(updateNodes, true),
    deselect: setSelection(updateNodes, false),
    delete: (target, state) => [
      removeNodes({ ids: [target.id] }),
      removeConnections({ ids: getNodeConnectionsIds(state, target.id) }),
    ],
    move: () => {
      let beforeState;
      let hasMoved = false;
      return {
        start: (target, event, state) => {
          beforeState = state;
        },
        drag: (target, event) => {
          hasMoved = true;
          return moveBox({
            id: target.id,
            delta: event.delta,
          });
        },
        end: () => {
          if (hasMoved) {
            return addCommand({
              title: 'Move',
              beforeState,
            });
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
