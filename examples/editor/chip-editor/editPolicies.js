import {
  setNodes,
  addConnection,
  moveBox,
  removeConnections,
  updateConnections,
  updateNodes,
  removeNodes,
} from '@regraph/editor/actions';

import {
  getConnectionById,
  getNodeConnectionsIds,
} from '@regraph/editor/selectors';
import isValidConnection from './isValidConnection';
import { markValidPorts, unmarkValidPorts } from './markValidPorts';

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
    return {
      start: (event, state) => {
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
        if (!isValid) {
          return [
            setNodes(nextNodes),
            removeConnections({
              ids: ['@@draggedConnection'],
            }),
          ];
        }

        const connection = getConnectionById(state, '@@draggedConnection');
        return [
          setNodes(nextNodes),
          updateConnections({
            ids: ['@@draggedConnection'],
            updates: {
              id: generateId(connection),
              overlay: true,
            },
          }),
        ];
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
    select: setSelection(updateNodes, true),
    deselect: setSelection(updateNodes, false),
    delete: (target, state) => [
      removeNodes({ ids: [target.id] }),
      removeConnections({ ids: getNodeConnectionsIds(state, target.id) }),
    ],
    move: (target, event) =>
      moveBox({
        id: target.id,
        delta: event.delta,
      }),
  },
  output: port,
  input: port,
};

export default target => editPolicies[target.type] || {};
