/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useMarkers from './useMarkers';

const defaultStyle = {
  stroke: '#777',
};

const Line = React.memo(
  ({
    id,
    src,
    dst,
    markerStart,
    markerEnd,
    selectable,
    styleAttrs,
    overlayStyleAttrs,
  }) => {
    const { MarkerStart, MarkerEnd, markerStartId, markerEndId } = useMarkers(
      id,
      markerStart,
      markerEnd
    );

    return (
      <g id={id}>
        <line
          className="connection"
          x1={src.x}
          y1={src.y}
          x2={dst.x}
          y2={dst.y}
          markerStart={markerStart && `url(#${markerStartId})`}
          markerEnd={markerEnd && `url(#${markerEndId})`}
          {...defaultStyle}
          {...styleAttrs}
        />
        {MarkerStart && MarkerStart}
        {MarkerEnd && MarkerEnd}
        {selectable && (
          <line
            className="connection-overlay"
            x1={src.x}
            y1={src.y}
            x2={dst.x}
            y2={dst.y}
            {...overlayStyleAttrs}
          />
        )}
      </g>
    );
  }
);

Line.propTypes = {
  dst: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  id: PropTypes.string.isRequired,
  markerEnd: PropTypes.element,
  markerStart: PropTypes.element,
  overlayStyleAttrs: PropTypes.object,
  selectable: PropTypes.bool,
  src: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  styleAttrs: PropTypes.object,
};

export default Line;
