/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMarkers from './useMarkers';

const Line = React.memo(
  ({
    id,
    src,
    dst,
    markerStart,
    markerEnd,
    selectable,
    className,
    presentation,
    overlayPresentation,
  }) => {
    const { MarkerStart, MarkerEnd, markerStartId, markerEndId } = useMarkers(
      id,
      markerStart,
      markerEnd
    );

    return (
      <g id={id}>
        {MarkerStart}
        {MarkerEnd}
        <line
          x1={src.x}
          y1={src.y}
          x2={dst.x}
          y2={dst.y}
          markerStart={markerStart && `url(#${markerStartId})`}
          markerEnd={markerEnd && `url(#${markerEndId})`}
          className={clsx(
            'regraph-connection',
            'regraph-connection-line',
            className
          )}
          stroke="#777"
          strokeWidth={2}
          {...presentation}
        />
        {selectable && (
          <line
            className="regraph-connection-overlay"
            x1={src.x}
            y1={src.y}
            x2={dst.x}
            y2={dst.y}
            {...overlayPresentation}
          />
        )}
      </g>
    );
  }
);

const PointPropTypes = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}).isRequired;

Line.propTypes = {
  className: PropTypes.string,
  dst: PointPropTypes,
  id: PropTypes.string.isRequired,
  markerEnd: PropTypes.element,
  markerStart: PropTypes.element,
  overlayPresentation: PropTypes.object,
  presentation: PropTypes.object,
  selectable: PropTypes.bool,
  src: PointPropTypes,
};

export default Line;
