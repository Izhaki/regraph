import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInteraction from './useInteraction';

export default WrappedComponent => {
  const WithInteraction = ({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onClick,
    ...props
  }) => {
    const ref = useRef(null);
    const interactionProps = useInteraction({
      ref,
      onClick,
      onMouseDown,
      onMouseMove,
      onMouseUp,
    });

    return <WrappedComponent {...interactionProps} {...props} />;
  };

  WithInteraction.propTypes = {
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseUp: PropTypes.func,
  };

  return WithInteraction;
};
