import React from 'react';
import ReactDOM from 'react-dom';
import { useForkRef, setRef, useMountedRef } from './refUtils';
import useEventCallback from './useEventCallback';

const ownerDocument = node => (node && node.ownerDocument) || document;
const mapEventPropToEvent = eventProp => eventProp.substring(2).toLowerCase();

export { useForkRef };

export default ({
  mouseEvent = 'onClick',
  touchEvent = 'onTouchEnd',
  onClickAway,
  ref,
}) => {
  const mountedRef = useMountedRef();
  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);

  const handleNodeRef = useForkRef(nodeRef, ref);
  // can be removed once we drop support for non ref forwarding class components
  const handleRef = React.useCallback(
    instance => {
      // #StrictMode ready
      setRef(handleNodeRef, ReactDOM.findDOMNode(instance));
    },
    [handleNodeRef]
  );

  const handleClickAway = useEventCallback(event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!mountedRef.current) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    const { current: node } = nodeRef;
    // The child might render null.
    if (!node) {
      return;
    }

    const doc = ownerDocument(node);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !node.contains(event.target)
    ) {
      onClickAway(event);
    }
  });

  const handleTouchMove = React.useCallback(() => {
    movedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);

      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, handleTouchMove, touchEvent]);

  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);

      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  return handleRef;
};
