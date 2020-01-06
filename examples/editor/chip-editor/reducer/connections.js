import { remove, update } from './utils';

export const connectionsAdd = ({ connections }, { type, ...connection }) => {
  connections.push(connection);
};

export const connectionsUpdate = ({ connections }, { ids, updates }) => {
  update(connections, ids, updates);
};

export const connectionsRemove = ({ connections }, { ids }) => {
  ids.forEach(id => {
    remove(connections, id);
  });
};
