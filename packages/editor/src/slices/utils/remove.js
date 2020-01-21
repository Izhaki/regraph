import idEqual from './idEqual';

export default (list, id) => {
  const index = list.findIndex(idEqual(id));
  if (index === -1) {
    throw new Error(`Could not find item with id ${id}`);
  }
  list.splice(index, 1);
};
