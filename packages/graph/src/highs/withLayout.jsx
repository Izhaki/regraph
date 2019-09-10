import React from 'react';

export default layout => WrappedComponent => props => (
  <WrappedComponent {...layout(props)} />
);
