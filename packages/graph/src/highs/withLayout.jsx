import React from 'react';
import useLayout from './useLayout';

export default layout => WrappedComponent => props => {
  const wrappedProps = useLayout(layout)(props);
  return <WrappedComponent {...wrappedProps} />;
};
