import React from 'react';
import PropTypes from 'prop-types';
import flipIf from './flipIf';

const { ceil } = Math;

export default WrappedComponent => {
  const withMarker = ({ id, ...others }) => {
    const { width, height, flip } = others;

    const { anchor: markerAnchor } = WrappedComponent.getMarkerProps(others);

    const anchor = flipIf(flip, [markerAnchor]);

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

  withMarker.getTrim = (props, strokeWidth) => {
    const { anchor } = WrappedComponent.getMarkerProps(props);
    const trim = (1 - anchor) * props.width * (strokeWidth || 1);
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
    markerAnchor: PropTypes.number,
    width: PropTypes.number.isRequired,
  };

  return withMarker;
};
