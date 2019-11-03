import React from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import { translate } from '../utils';

export default WrappedComponent => {
  const withPosition = props => {
    const {
      box: { x, y },
      isHtml,
    } = props;

    return isHtml ? (
      <span style={{ position: 'absolute', left: x, top: y }}>
        <WrappedComponent {...props} />
      </span>
    ) : (
      <g transform={translate(x, y)}>
        <WrappedComponent {...props} />
      </g>
    );
  };

  withPosition.propTypes = {
    box: PointPropTypes.isRequired,
    isHtml: PropTypes.bool,
  };

  return withPosition;
};
