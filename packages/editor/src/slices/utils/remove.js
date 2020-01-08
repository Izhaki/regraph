import idEqual from './idEqual';

export default (list, id) => {
  list.splice(list.findIndex(idEqual(id)), 1);
};
