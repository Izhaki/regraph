const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

export default ({
  onClick: inClick,
  onDragStart: inDragStart,
  onDrag: inDrag,
  onDragEnd: inDragEnd,
  ...passThroughs
}) => {
  let downEvent;
  let dragHandler;

  const onDragPost = event => {
    inDrag(event);
  };

  const onDragPre = event => {
    if (
      distance(
        downEvent.clientX,
        downEvent.clientY,
        event.clientX,
        event.clientY
      ) > 4
    ) {
      inDragStart(downEvent);
      inDrag(event);
      dragHandler = onDragPost;
    }
  };

  const onDragStart = event => {
    event.persist();
    downEvent = event;
    dragHandler = onDragPre;
  };

  const onDrag = event => dragHandler(event);

  const isDragging = () => dragHandler === onDragPost;
  const onDragEnd = event => (isDragging() ? inDragEnd(event) : inClick(event));

  const onClick = event => {
    inClick(event);
  };

  return {
    onClick,
    onDragStart,
    onDrag,
    onDragEnd,
    ...passThroughs,
  };
};
