import isRect from './isRect';

const nullRect = { x: 0, y: 0, width: 0, height: 0 };

export default (rect, fill = nullRect) => {
  if (!isRect(rect)) {
    rect.x = rect.x || fill.x;
    rect.y = rect.y || fill.y;
    rect.width = rect.width || fill.width;
    rect.height = rect.height || fill.height;
  }
  return rect;
};
