import { isRect } from '@regraph/geo/rect';

const { keys, values, entries } = Object;

export { keys, values, entries };

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const isEmpty = value => {
  if (value === undefined || value === null) {
    return true;
  }
  if (value.length) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return keys(value).length === 0;
  }
  return false;
};

// Core
const nullBox = { x: 0, y: 0, width: 0, height: 0 };
export const ensureRect = box => (isRect(box) ? box : { ...nullBox, ...box });

export const translate = (x, y) => `translate(${x} ${y})`;