/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMarkers from './useMarkers';
import { getSvgCoordinates, trim } from '@regraph/geo/line';

const Line = React.memo(
  ({
    id,
    src,
    dst,
    markerStart,
    markerEnd,
    selectable,
    className,
    strokeWidth,
    ...others
  }) => {
    const { MarkerStart, MarkerEnd, startTrim, endTrim } = useMarkers(
      id,
      markerStart,
      markerEnd,
      strokeWidth
    );

    const coordinates = useMemo(() => {
      const line = trim({ src, dst }, startTrim, endTrim);
      return getSvgCoordinates(line);
    }, [src, dst, startTrim, endTrim]);

    return (
      <g id={id}>
        {MarkerStart}
        {MarkerEnd}
        <line
          {...coordinates}
          markerStart={MarkerStart && `url(#${MarkerStart.props.id})`}
          markerEnd={MarkerEnd && `url(#${MarkerEnd.props.id})`}
          className={clsx(
            'regraph-connection',
            'regraph-connection-line',
            className
          )}
          stroke="#777"
          style={{ strokeWidth }}
          {...others}
        />
        {selectable && (
          <line
            className="regraph-connection-overlay"
            x1={src.x}
            y1={src.y}
            x2={dst.x}
            y2={dst.y}
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
  selectable: PropTypes.bool,
  src: PointPropTypes,
  strokeWidth: PropTypes.number,
};

export default Line;
