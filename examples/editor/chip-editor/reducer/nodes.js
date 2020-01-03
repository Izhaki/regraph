import { find, remove } from './utils';

const isNode = item => item.type === 'chip';

export const select = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = find(nodes, meta.id);
    node.selected = true;
  });
};

export const deselect = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = find(nodes, meta.id);
    node.selected = false;
  });
};

export const deleteNodes = ({ nodes }, { payload: ids }) => {
  ids.forEach(id => {
    remove(nodes, id);
  });
};
