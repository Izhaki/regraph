import React from 'react';
import useAutoViewportSize from './useAutoViewportSize';

export default (options = {}) => {
  const withAutoViewportSize = WrappedComponent => props => {
    const newProps = useAutoViewportSize(options)(props);
    return <WrappedComponent {...newProps} />;
  };

  return withAutoViewportSize;
};
