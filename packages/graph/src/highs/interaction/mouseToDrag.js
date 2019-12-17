export default ({
  onClick,
  onDragStart,
  onDrag,
  onDragEnd,
  ...passThroughs
}) => {
  let isMouseDown = false;
  let isDragging = false;

  const onMouseDown = event => {
    isMouseDown = true;
    const cancelDrag = onDragStart(event) === false;
    if (cancelDrag) {
      isMouseDown = false;
    }
  };

  const onMouseMove = event => {
    if (isMouseDown) {
      isDragging = true;
      onDrag(event);
    }
  };

  const onMouseUp = event => {
    // MouseDown can happen outside the element, but the move and up events in it
    if (isMouseDown) {
      if (isDragging) {
        onDragEnd(event);
      } else {
        onClick(event);
      }
    }
    isMouseDown = false;
    isDragging = false;
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    ...passThroughs,
  };
};
