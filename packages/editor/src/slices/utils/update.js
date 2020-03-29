import find from './find';
import { isObject } from '@regraph/core';

export default (collection, ids, updates) => {
  ids.forEach(id => {
    const item = find(collection, id);
    Object.entries(updates).forEach(([prop, update]) => {
      item[prop] = isObject(item[prop]) ? { ...item[prop], ...update } : update;
    });
  });
};
