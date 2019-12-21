const blah = e => {
  e.preventDefault();
};

export default ({ onMouseDown, onMouseMove, onMouseUp, ...passThroughs }) => {
  let currentTouchId;
  let currentTouch;

  const getCurrentTouch = event => {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      if (event.changedTouches[i].identifier === currentTouchId) {
        return event.changedTouches[i];
      }
    }
    return undefined;
  };

  const toMouseEvent = event => {
    // By default, TouchStart and TouchEnd are followed by MouseDown and MouseUp.
    // We don't want this as we call the mouse callback, so we call `preventDefault`.
    // In the case of TouchMove, `preventDefault` prevent scrolling on buggy browsers.
    event.preventDefault();
    currentTouch = getCurrentTouch(event);
    event.clientX = currentTouch.clientX;
    event.clientY = currentTouch.clientY;
    event.target = document.elementFromPoint(event.clientX, event.clientY);
    return event;
  };

  const onTouchStart = event => {
    document.addEventListener('touchmove', blah, { passive: false });

    currentTouchId = event.changedTouches[0].identifier;
    onMouseDown(toMouseEvent(event));
  };

  const onTouchMove = event => {
    onMouseMove(toMouseEvent(event));
  };

  const onTouchEnd = event => {
    document.removeEventListener('touchmove', blah);
    onMouseUp(toMouseEvent(event));
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...passThroughs,
  };
};
