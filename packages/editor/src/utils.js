const { isArray } = Array;

export const ensureArray = (x = []) => (isArray(x) ? x : [x]);
