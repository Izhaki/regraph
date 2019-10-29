import queryBox from './queryBox';
import getOffsetToParent from './getOffsetToParent';

export default id => {
  const element = document.getElementById(id);
  const box = queryBox(element);

  const offset = getOffsetToParent(element);
  box.x += offset.x;
  box.y += offset.y;

  return box;
};
