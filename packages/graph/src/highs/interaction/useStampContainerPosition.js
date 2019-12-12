import { useRef } from 'react';
import { useForkRef } from './useClickAway';

export default ({
  ref,
  onMouseDown: inMouseDown,
  onMouseMove: inMouseMove,
  onMouseUp: inMouseUp,
  ...passThroughs
}) => {
  let containerBox;

  // We need an object-ref to access .current.getBoundingClientRect...
  const objectRef = useRef(null);

  // ...but the incoming ref may be a callback-ref, so fork it.
  const outRef = useForkRef(ref, objectRef);

  const stampPosition = event => {
    // newApi
    event.containerX = event.clientX - containerBox.x;
    event.containerY = event.clientY - containerBox.y;

    // oldApi
    event.position = { x: event.containerX, y: event.containerY };
  };

  const onMouseEnter = () => {
    containerBox = objectRef.current.getBoundingClientRect();
  };

  const onMouseDown = event => {
    containerBox = objectRef.current.getBoundingClientRect();
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
    ref: outRef,
    onMouseEnter,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    ...passThroughs,
  };
};
