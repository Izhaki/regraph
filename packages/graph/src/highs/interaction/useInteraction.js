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
  eventMapper = event => event,
  ref,
  onMouseDown = noop,
  onMouseMove = noop,
  onMouseUp = noop,
  props,
}) => {
  const onMouseDownStable = useEventCallback(event =>
    onMouseDown(eventMapper(event, props))
  );
  const onMouseMoveStable = useEventCallback(event =>
    onMouseMove(eventMapper(event, props))
  );
  const onMouseUpStable = useEventCallback(event =>
    onMouseUp(eventMapper(event, props))
  );

  const interactionProps = useMemo(
    () =>
      useInteraction({
        ref,
        onMouseDown: onMouseDownStable,
        onMouseMove: onMouseMoveStable,
        onMouseUp: onMouseUpStable,
      }),
    [ref, onMouseDownStable, onMouseMoveStable, onMouseUpStable]
  );

  const clickAwayRef = useMouseAway({
    mouseEvent: 'onMouseUp',
    onMouseAway: interactionProps.onMouseUp,
    ref,
  });

  return { ...interactionProps, ref: clickAwayRef };
};
