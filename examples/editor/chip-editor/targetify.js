const targetifyPorts = (ports, target) =>
  ports && ports.map(port => ({ ...port, 'data-target': target }));

export const targetifyNode = node => ({
  ...node,
  'data-target': 'chip',
  inputs: targetifyPorts(node.inputs, 'input'),
  outputs: targetifyPorts(node.outputs, 'output'),
});

export const targetifyConnection = connection => ({
  ...connection,
  overlay: true,
});
