export default ({ onMouseMove: inMouseMove, ...passThroughs }) => {
  let lastX;
  let lastY;

  const stampDelta = event => {
    // New API
    event.deltaX = event.clientX - lastX;
    event.deltaY = event.clientY - lastY;

    // Old API
    event.delta = { x: event.deltaX, y: event.deltaY };
  };

  const updateLast = event => {
    lastX = event.clientX;
    lastY = event.clientY;
  };

  const onMouseEnter = event => {
    updateLast(event);
  };

  const onMouseMove = event => {
    stampDelta(event);
    updateLast(event);
    inMouseMove(event);
  };

  return {
    onMouseEnter,
    onMouseMove,
    ...passThroughs,
  };
};
