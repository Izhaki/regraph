import React from 'react';
import { PointPropTypes } from '@regraph/core';

export default WrappedComponent => {
  const withHtmlPosition = props => {
    const {
      box: { x, y },
    } = props;

    return (
      <span style={{ position: 'absolute', left: x, top: y }}>
        <WrappedComponent {...props} />
      </span>
    );
  };

  withHtmlPosition.propTypes = {
    box: PointPropTypes.isRequired,
  };

  return withHtmlPosition;
};
