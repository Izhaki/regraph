export default ({
  ref,
  onMouseDown: inMouseDown,
  onMouseMove: inMouseMove,
  onMouseUp: inMouseUp,
  ...passThroughs
}) => {
  let containerBox;

  const stampPosition = event => {
    // newApi
    event.containerX = event.clientX - containerBox.x;
    event.containerY = event.clientY - containerBox.y;

    // oldApi
    event.position = { x: event.containerX, y: event.containerY };
  };

  const onMouseEnter = () => {
    containerBox = ref.current.getBoundingClientRect();
  };

  const onMouseDown = event => {
    containerBox = ref.current.getBoundingClientRect();
    stampPosition(event);
    inMouseDown(event);
  };

  const onMouseMove = event => {
    stampPosition(event);
    inMouseMove(event);
  };

  const onMouseUp = event => {
    stampPosition(event);
    inMouseUp(event);
  };

  return {
    ref,
    onMouseEnter,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    ...passThroughs,
  };
};
