const targetifyPorts = (ports, target) =>
  ports && ports.map(port => ({ ...port, 'data-target': target }));

export const targetifyNode = node => ({
  ...node,
  'data-target': 'node',
  inputs: targetifyPorts(node.inputs, 'input'),
  outputs: targetifyPorts(node.outputs, 'output'),
});

export const targetifyConnection = connection => ({
  ...connection,
  targeting: { 'data-target': 'connection' },
});
