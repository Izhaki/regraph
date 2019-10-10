const antialiasing = 0.5;
const stroked = stroke => stroke !== 'none';

export default (width, height, stroke = 'none', strokeWidth = 1) => {
  const offset = (stroked(stroke) ? strokeWidth : 0) + antialiasing;
  return [width - offset, height - offset];
};
