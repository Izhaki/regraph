const antialiasingShift = 0.5;

export default ({ id, element: el }, rootElement) => {
  const element = el || document.getElementById(id);
  const box = element.getBoundingClientRect();
  const parent = rootElement.getBoundingClientRect();

  box.x -= parent.x + antialiasingShift;
  box.y -= parent.y + antialiasingShift;

  return box;
};
