import React from 'react';
import PropTypes from 'prop-types';
import { toSvgViewBox } from '@regraph/geo/rect';

const Marker = ({ id, width, height, viewBox, anchor, children }) => (
  <marker
    id={id}
    markerWidth={width}
    markerHeight={height}
    viewBox={toSvgViewBox(viewBox)}
    refX={anchor.x}
    refY={anchor.y}
    markerUnits="strokeWidth"
    orient="auto">
    {children}
  </marker>
);

// TODO: DRY
const PointPropTypes = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}).isRequired;

const RectPropTypes = PropTypes.shape({
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}).isRequired;

Marker.propTypes = {
  anchor: PointPropTypes,
  children: PropTypes.element.isRequired,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  viewBox: RectPropTypes,
  width: PropTypes.number,
};

export default Marker;
