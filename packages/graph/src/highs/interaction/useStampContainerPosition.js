export default ({
  ref,
  onMouseDown: inMouseDown,
  onMouseMove: inMouseMove,
  onMouseUp: inMouseUp,
  ...passThroughs
}) => {
  let containerBox;

  const stampPosition = event => {
    containerBox = containerBox || ref.current.getBoundingClientRect();

    event.containerX = event.clientX - containerBox.x;
    event.containerY = event.clientY - containerBox.y;
    event.getPosition = () => ({ x: event.containerX, y: event.containerY });
  };

  const onMouseDown = event => {
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
    onMouseDown,
    onMouseMove,
    onMouseUp,
    ...passThroughs,
  };
};
