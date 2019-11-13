import queryBox from './queryBox';
import getOffsetToParent from './getOffsetToParent';

const antialiasingShift = 0.5;

export default ({ id, element: el }, rootElement) => {
  const element = el || document.getElementById(id);
  const box = queryBox(element);

  const offset = getOffsetToParent(element);
  box.x += offset.x - antialiasingShift;
  box.y += offset.y - antialiasingShift;

  return box;
};
