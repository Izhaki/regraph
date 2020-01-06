import { remove, update } from './utils';

export const nodesUpdate = ({ nodes }, { ids, updates }) => {
  update(nodes, ids, updates);
};

export const nodesRemove = ({ nodes }, { ids }) => {
  ids.forEach(id => {
    remove(nodes, id);
  });
};
