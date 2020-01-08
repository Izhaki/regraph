import idEqual from './idEqual';

export default (list, id) => list.find(idEqual(id));
