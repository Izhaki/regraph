import idEqual from './idEqual';

export default (list, id) => {
  const index = list.findIndex(idEqual(id));
  // If two connected nodes are selected, there could be two requests to delete
  // the same connection. Making these requests unique is not trivial. So we
  // simply do nothing if the item was not found.
  if (index !== -1) {
    list.splice(index, 1);
  }
};
