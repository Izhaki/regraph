const antialiasing = 0.5;
const stroked = stroke => stroke !== 'none';

export const getStrokeWidth = (stroke, strokeWidth = 1) =>
  (stroked(stroke) ? strokeWidth : 0) + antialiasing;

export default (width, height, stroke = 'none', strokeWidth) => {
  const offset = getStrokeWidth(stroke, strokeWidth);
  return [width - offset, height - offset];
};
