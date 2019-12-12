import useClickAway from './useClickAway';

export default ({
  ref,
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
    isMouseDown = false;
    inMouseUp(event);
  };

  const onClickAway = event => {
    if (isMouseDown) {
      onMouseUp(event);
    }
  };

  const clickAwayRef = useClickAway({
    mouseEvent: 'onMouseUp',
    onClickAway,
    ref,
  });

  return {
    ref: clickAwayRef,
    onMouseDown,
    onMouseUp,
    ...passThroughs,
  };
};
