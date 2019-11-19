export default ({ id, element: el }, parentBox) => {
  const element = el || document.getElementById(id);
  const { x, y, width, height } = element.getBoundingClientRect();
  return {
    x: x - parentBox.x,
    y: y - parentBox.y,
    width,
    height,
  };
};
