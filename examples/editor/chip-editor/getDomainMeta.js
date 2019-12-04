const idEqual = id => item => item.id === id;

export default (element, { nodes }) => {
  const type = element.getAttribute('data-target');
  switch (type) {
    case 'input':
    case 'output': {
      const [id, portId] = element.id.split('/');
      const node = nodes.find(idEqual(id));
      const ports = node[type === 'input' ? 'inputs' : 'outputs'];
      const port = ports.find(idEqual(portId));
      return {
        type,
        port,
        id,
      };
    }

    case 'chip': {
      return {
        type,
        id: element.id,
      };
    }

    case 'connection': {
      return {
        type,
        id: element.getAttribute('data-target-id'),
      };
    }
    default:
      return null;
  }
};
