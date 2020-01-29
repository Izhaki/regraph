import find from './find';

export default (collection, ids, updates) => {
  ids.forEach(id => {
    const item = find(collection, id);
    Object.entries(updates).forEach(([prop, update]) => {
      item[prop] = update;
    });
  });
};
