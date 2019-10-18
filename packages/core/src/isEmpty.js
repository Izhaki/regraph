const { keys } = Object;

export default value => {
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
