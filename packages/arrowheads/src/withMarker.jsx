import React from 'react';
import PropTypes from 'prop-types';

const { ceil, abs } = Math;

export default WrappedComponent => {
  const withMarker = ({ id, ...others }) => {
    const { width, height, flip } = others;

    const { anchor } = WrappedComponent.getMarkerProps(others);

    const halfHeight = ceil(height / 2);
    return (
      <marker
        id={id}
        markerWidth={width}
        markerHeight={height}
        viewBox={`${flip ? width : -width} ${-halfHeight} ${width}, ${height} `}
        refX={anchor}
        refY="0"
        markerUnits="strokeWidth"
        orient="auto">
        <WrappedComponent {...others} />
      </marker>
    );
  };

  withMarker.getTrim = (props, strokeWidth) => {
    const { anchor } = WrappedComponent.getMarkerProps(props);
    const trim = abs(anchor) * (strokeWidth || 1);
    if (trim !== 0 && !strokeWidth) {
      console.warn(
        `Regraph: a ${WrappedComponent.name} marker may not render correctly as no 'strokeWidth' property was provided to the connection.`
      );
    }
    return trim;
  };

  withMarker.propTypes = {
    height: PropTypes.number.isRequired,
    id: PropTypes.string,
    width: PropTypes.number.isRequired,
  };

  return withMarker;
};
