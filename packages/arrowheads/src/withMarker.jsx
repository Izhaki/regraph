import React from 'react';
import PropTypes from 'prop-types';
import { toSvgViewBox } from '@regraph/geo/rect';

export default WrappedComponent => {
  const withMarker = ({ id, ...others }) => {
    const { viewBox, ref, width, height } = WrappedComponent.getMarkerProps(
      others
    );

    return (
      <marker
        id={id}
        markerWidth={width}
        markerHeight={height}
        viewBox={toSvgViewBox(viewBox)}
        refX={ref.x}
        refY={ref.y}
        markerUnits="strokeWidth"
        orient="auto">
        <WrappedComponent {...others} />
      </marker>
    );
  };

  withMarker.getTrim = (props, strokeWidth) => {
    const { trim } = WrappedComponent.getMarkerProps(props);
    const trimScaled = trim * (strokeWidth || 1);
    if (trimScaled !== 0 && !strokeWidth) {
      console.warn(
        `Regraph: a ${WrappedComponent.name} marker may not render correctly as no 'strokeWidth' property was provided to the connection.`
      );
    }
    return trimScaled;
  };

  withMarker.propTypes = {
    id: PropTypes.string,
  };

  return withMarker;
};
