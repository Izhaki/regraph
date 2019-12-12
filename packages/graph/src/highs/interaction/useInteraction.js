import { useRef } from 'react';
import { compose } from '../../utils';
import rafThrottle from './rafThrottle';
import stampDelta from './stampDelta';
import throttleDragStartByDistance from './throttleDragStartByDistance';
import useStampContainerPosition from './useStampContainerPosition';
import useClickAwayInterceptor from './useClickAwayInterceptor';
import mouseToDrag from './mouseToDrag';

// { ref, onClick, onDragStart, onDrag, onDragEnd } → { ref, onMouseDown, onMouseMove, onMouseUp, onMouseEnter }
const useInteraction = compose(
  rafThrottle,
  stampDelta,
  useClickAwayInterceptor,
  useStampContainerPosition,
  mouseToDrag,
  throttleDragStartByDistance
);

export default props => useRef(useInteraction(props)).current;
