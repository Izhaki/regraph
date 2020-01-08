import isValidConnection from '../isValidConnection';

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

export const connectionStart = ({ nodes, connections }, { srcMeta }) => {
  forEachPort(nodes, dstMeta => {
    dstMeta.port.disabled = !isValidConnection(srcMeta, dstMeta, connections);
  });
};

export const connectionEnd = ({ nodes }) => {
  enableAllPorts(nodes);
};
