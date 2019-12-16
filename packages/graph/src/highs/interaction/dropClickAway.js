// We are not interested in clicks (mousedown then mouseup) outside our component, so drop mouseups in the mousedown
// didn't happen on our component

export default ({
  onMouseDown: inMouseDown,
  onMouseUp: inMouseUp,
  ...passThroughs
}) => {
  let isMouseDown = false;

  const onMouseDown = event => {
    isMouseDown = true;
    inMouseDown(event);
  };

  const onMouseUp = event => {
    if (isMouseDown) {
      inMouseUp(event);
    }
  };

  return {
    onMouseDown,
    onMouseUp,
    ...passThroughs,
  };
};
