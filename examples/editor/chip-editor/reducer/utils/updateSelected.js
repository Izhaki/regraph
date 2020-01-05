import find from './find';

export default (collection, ids, selected) => {
  ids.forEach(id => {
    const item = find(collection, id);
    item.selected = selected;
  });
};
