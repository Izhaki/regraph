import React from 'react';
import PropTypes from 'prop-types';
import flipIf from './flipIf';

const { ceil } = Math;

export default WrappedComponent => {
  const withMarker = ({ id, markerAnchor: markerAnchorProp, ...others }) => {
    const { width, height, tip: tipProp = 1, flip } = others;

    const [markerAnchor, tip] = flipIf(flip, [markerAnchorProp, tipProp]);

    const anchor = markerAnchor || tip;

    const halfHeight = ceil(height / 2);
    return (
      <marker
        id={id}
        markerWidth={width}
        markerHeight={height}
        viewBox={`0 ${-halfHeight} ${width}, ${height} `}
        refX={anchor * width}
        refY="0"
        markerUnits="strokeWidth"
        orient="auto">
        <WrappedComponent {...others} />
      </marker>
    );
  };

  withMarker.propTypes = {
    id: PropTypes.string,
    markerAnchor: PropTypes.number,
  };

  return withMarker;
};
