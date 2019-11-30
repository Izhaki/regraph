import React from 'react';
import { PointPropTypes } from '@regraph/core';
import { translate } from '../utils';

export default WrappedComponent => {
  const withSvgPosition = props => {
    const {
      box: { x, y },
    } = props;

    return (
      <g transform={translate(x, y)}>
        <WrappedComponent {...props} />
      </g>
    );
  };

  withSvgPosition.propTypes = {
    box: PointPropTypes.isRequired,
  };

  return withSvgPosition;
};
