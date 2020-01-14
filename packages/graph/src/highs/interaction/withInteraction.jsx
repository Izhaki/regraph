import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInteraction from './useInteraction';

export default eventMapper => WrappedComponent => {
  const WithInteraction = ({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    ...props
  }) => {
    const ref = useRef(null);
    const interactionProps = useInteraction({
      eventMapper,
      ref,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      props,
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
