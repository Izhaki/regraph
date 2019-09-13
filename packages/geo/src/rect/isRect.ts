const isNumber = (x: number): boolean => typeof x === 'number';
export default (rect): boolean =>
  rect &&
  isNumber(rect.x) &&
  isNumber(rect.y) &&
  isNumber(rect.width) &&
  isNumber(rect.height);
