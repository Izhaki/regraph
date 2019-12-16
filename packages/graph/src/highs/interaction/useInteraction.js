import { useMemo } from 'react';
import { compose } from '../../utils';
import dropClickAway from './dropClickAway';
import rafThrottle from './rafThrottle';
import stampDelta from './stampDelta';
import useStampContainerPosition from './useStampContainerPosition';
import mouseToDrag from './mouseToDrag';
import throttleDragStartByDistance from './throttleDragStartByDistance';
import useMouseAway from './useMouseAway';
import useEventCallback from './useMouseAway/useEventCallback';

const noop = () => {};

// { ref, onClick, onDragStart, onDrag, onDragEnd } → { ref, onMouseDown, onMouseMove, onMouseUp, onMouseEnter }
const useInteraction = compose(
  dropClickAway,
  rafThrottle,
  stampDelta,
  useStampContainerPosition,
  mouseToDrag,
  throttleDragStartByDistance
);

export default ({
  ref,
  onClick = noop,
  onDragStart = noop,
  onDrag = noop,
  onDragEnd = noop,
}) => {
  const onClickStable = useEventCallback(onClick);
  const onDragStartStable = useEventCallback(onDragStart);
  const onDragStable = useEventCallback(onDrag);
  const onDragEndStable = useEventCallback(onDragEnd);

  const interactionProps = useMemo(
    () =>
      useInteraction({
        ref,
        onClick: onClickStable,
        onDragStart: onDragStartStable,
        onDrag: onDragStable,
        onDragEnd: onDragEndStable,
      }),
    [onClickStable, onDragEndStable, onDragStable, onDragStartStable, ref]
  );
  const { onMouseUp } = interactionProps;

  const clickAwayRef = useMouseAway({
    mouseEvent: 'onMouseUp',
    onMouseAway: onMouseUp,
    ref,
  });

  return { ...interactionProps, ref: clickAwayRef };
};
