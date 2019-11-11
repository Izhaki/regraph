import queryBox from './queryBox';
import getOffsetToParent from './getOffsetToParent';
import escapeSelector from './escapeSelector';

const antialiasingShift = 0.5;

export default ({ id, element: el }, rootElement) => {
  const selector = `#${escapeSelector(id)}`;
  const element = el || rootElement.querySelector(selector);
  const box = queryBox(element);

  const offset = getOffsetToParent(element);
  box.x += offset.x - antialiasingShift;
  box.y += offset.y - antialiasingShift;

  return box;
};
