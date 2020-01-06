import find from './find';

export default (collection, ids, updates) => {
  ids.forEach(id => {
    const connection = find(collection, id);
    Object.entries(updates).forEach(([prop, update]) => {
      connection[prop] = update;
    });
  });
};
