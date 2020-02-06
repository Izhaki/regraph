const idEqual = id => item => item.id === id;

const getTargetType = element => element.getAttribute('data-target');

let target;
let type;

export default (element, { nodes }) => {
  // This will work for all bug g elements
  target = element;
  type = getTargetType(target);
  if (!type) {
    // This is for the case of svg g elements - they emit no pointer events
    // as they have no geometry. So we search the closest parent that has
    // [data-target], stopping at the svg itself.
    target = element.closest('[data-target], svg');
    type = getTargetType(target);
  }

  switch (type) {
    case 'input':
    case 'output': {
      const [id, portId] = target.id.split('/');
      const node = nodes.find(idEqual(id));
      const ports = node[type === 'input' ? 'inputs' : 'outputs'];
      const port = ports.find(idEqual(portId));
      return {
        type,
        port,
        id,
      };
    }

    case 'node': {
      return {
        type,
        id: target.id,
      };
    }

    case 'connection': {
      return {
        type,
        id: target.id,
      };
    }
    default:
      return {};
  }
};
