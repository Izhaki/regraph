import { useMemo } from 'react';
import { compose } from '../../utils';
import dropClickAway from './dropClickAway';
import touchSupport from './touchSupport';
import rafThrottle from './rafThrottle';
import stampDelta from './stampDelta';
import useStampContainerPosition from './useStampContainerPosition';
import useMouseAway from './useMouseAway';
import useEventCallback from './useMouseAway/useEventCallback';

const noop = () => {};

// { ref, onClick, onMouseDown, onMouseMove, onMouseUp } → { ref, onMouseDown, onMouseMove, onMouseUp, onMouseEnter }
const useInteraction = compose(
  dropClickAway,
  touchSupport,
  rafThrottle,
  stampDelta,
  useStampContainerPosition
);

export default ({
  ref,
  onMouseDown = noop,
  onMouseMove = noop,
  onMouseUp = noop,
}) => {
  const onMouseDownStable = useEventCallback(onMouseDown);
  const onMouseMoveStable = useEventCallback(onMouseMove);
  const onMouseUpStable = useEventCallback(onMouseUp);

  const interactionProps = useMemo(
    () =>
      useInteraction({
        ref,
        onMouseDown: onMouseDownStable,
        onMouseMove: onMouseMoveStable,
        onMouseUp: onMouseUpStable,
      }),
    [onMouseUpStable, onMouseMoveStable, onMouseDownStable, ref]
  );

  const clickAwayRef = useMouseAway({
    mouseEvent: 'onMouseUp',
    onMouseAway: interactionProps.onMouseUp,
    ref,
  });

  return { ...interactionProps, ref: clickAwayRef };
};
