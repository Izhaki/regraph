import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';

export default WrappedComponent => {
  const withInteraction = ({
    onDragStart,
    onDrag,
    onDragEnd,
    onClick,
    ...props
  }) => {
    const enrich = handler => (event, { x, y, deltaX: dx, deltaY: dy }) => {
      event.position = { x, y };
      event.delta = { x: dx, y: dy };
      if (handler) {
        return handler(event);
      }
    };

    return (
      <DraggableCore
        onStart={enrich(onDragStart)}
        onDrag={enrich(onDrag)}
        onStop={enrich(onDragEnd)}>
        <div onClick={onClick} role="figure">
          <WrappedComponent {...props} />
        </div>
      </DraggableCore>
    );
  };

  withInteraction.propTypes = {
    onClick: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func,
  };

  return withInteraction;
};
