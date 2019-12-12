import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInteraction from './useInteraction';

export default WrappedComponent => {
  const WithInteraction = ({
    onDragStart,
    onDrag,
    onDragEnd,
    onClick,
    ...props
  }) => {
    const ref = useRef(null);
    const interactionProps = useInteraction({
      ref,
      onClick,
      onDragStart,
      onDrag,
      onDragEnd,
    });
    // TODO: get rid of div
    return (
      <div {...interactionProps}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  WithInteraction.propTypes = {
    onClick: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func,
  };

  return WithInteraction;
};
