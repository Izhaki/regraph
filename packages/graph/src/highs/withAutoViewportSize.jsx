import React from 'react';
import useAutoViewportSize from './useAutoViewportSize';

export default padding => {
  const withAutoViewportSize = WrappedComponent => props => {
    const newProps = useAutoViewportSize(padding)(props);
    return <WrappedComponent {...newProps} />;
  };

  return withAutoViewportSize;
};
