import React from 'react';
import PropTypes from 'prop-types';
import useAutoViewportSize from './useAutoViewportSize';

export default (options = {}) => {
  const withAutoViewportSize = WrappedComponent => props => {
    // ESLint does not pick the propTypes below for some reason.
    // eslint-disable-next-line react/prop-types
    const { width, height } = useAutoViewportSize(props.boxes, options);
    return <WrappedComponent {...props} width={width} height={height} />;
  };

  withAutoViewportSize.propTypes = {
    boxes: PropTypes.object.isRequired,
  };

  return withAutoViewportSize;
};
