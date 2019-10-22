const { abs } = Math;
export const isNegativeZero = (x: number): boolean => Object.is(x, -0);
export const isNegative = (x: number): boolean => x < 0 || isNegativeZero(x);
export const isPositive = (x: number): boolean => !isNegative(x);
export const isNumber = (x: number): boolean => typeof x === 'number';
export { abs };
