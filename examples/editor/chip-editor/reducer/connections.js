import { find, remove, updateSelected } from './utils';

export const connectionsAdd = ({ connections }, { type, ...connection }) => {
  connections.push(connection);
};

export const connectionsUpdate = ({ connections }, { id, updates }) => {
  const connection = find(connections, id);
  Object.entries(updates).forEach(([prop, update]) => {
    connection[prop] = update;
  });
};

export const connectionsSelect = ({ connections }, { ids }) => {
  updateSelected(connections, ids, true);
};

export const connectionsDeselect = ({ connections }, { ids }) => {
  updateSelected(connections, ids, false);
};

export const connectionsRemove = ({ connections }, { ids }) => {
  ids.forEach(id => {
    remove(connections, id);
  });
};
