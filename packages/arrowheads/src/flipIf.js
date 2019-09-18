export default (flip, arr, max = 1) => (flip ? arr.map(x => max - x) : arr);
