const { isArray } = Array;

export default (x = []) => (isArray(x) ? x : [x]);
