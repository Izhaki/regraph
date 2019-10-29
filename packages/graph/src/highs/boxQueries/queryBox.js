const isSvgElement = element => element.getBBox !== undefined;

const querySvgBox = element => {
  const b = element.getBBox();
  return { x: b.x, y: b.y, width: b.width, height: b.height };
};

const queryOffsetBox = element => ({
  x: element.offsetLeft,
  y: element.offsetTop,
  width: element.offsetWidth,
  height: element.offsetHeight,
});

export default element => {
  const getBox = isSvgElement(element) ? querySvgBox : queryOffsetBox;
  return getBox(element);
};
