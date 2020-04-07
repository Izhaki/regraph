import { createDraft, finishDraft } from 'immer';

const forEachPort = (nodes, callback) => {
  nodes.forEach(node => {
    if (node.inputs) {
      node.inputs.forEach(port => {
        callback({ port, id: node.id, type: 'input' });
      });
    }
    if (node.outputs) {
      node.outputs.forEach(port => {
        callback({ port, id: node.id, type: 'output' });
      });
    }
  });
};

const enableAllPorts = nodes => {
  forEachPort(nodes, ({ port }) => {
    port.disabled = false;
  });
};

export const markValidPorts = (
  { nodes, connections },
  source,
  isValidConnection
) => {
  const nextNodes = createDraft(nodes);
  forEachPort(nextNodes, target => {
    target.port.disabled = !isValidConnection(source, target, connections);
  });
  return finishDraft(nextNodes);
};

export const unmarkValidPorts = nodes => {
  const nextNodes = createDraft(nodes);
  enableAllPorts(nextNodes);
  return finishDraft(nextNodes);
};
