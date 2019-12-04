const idEqual = id => item => item.id === id;

const isNode = item => item.type === 'chip';

export const select = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = nodes.find(idEqual(meta.id));
    node.selected = true;
  });
};

export const deselect = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = nodes.find(idEqual(meta.id));
    node.selected = false;
  });
};
