/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import clsx from 'clsx';
import useMarkers from './useMarkers';
import { getSvgCoordinates, trim } from '@regraph/geo/line';

const Line = React.memo(
  ({ id, src, dst, selectable, className, strokeWidth, ...others }) => {
    const { srcMarker, dstMarker, srcTrim, dstTrim } = useMarkers(
      id,
      src,
      dst,
      strokeWidth
    );

    const padding = {
      src: src.padding || 0,
      dst: dst.padding || 0,
    };

    const coordinates = useMemo(() => {
      const line = trim(
        { src, dst },
        srcTrim + padding.src,
        dstTrim + padding.dst
      );
      return getSvgCoordinates(line);
    }, [src, dst, srcTrim, padding.src, padding.dst, dstTrim]);

    return (
      <g id={id}>
        {srcMarker}
        {dstMarker}
        <line
          {...coordinates}
          markerStart={srcMarker && `url('#${srcMarker.props.id}')`}
          markerEnd={dstMarker && `url('#${dstMarker.props.id}')`}
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

Line.propTypes = {
  className: PropTypes.string,
  dst: PointPropTypes.isRequired,
  id: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  src: PointPropTypes.isRequired,
  strokeWidth: PropTypes.number,
};

export default Line;
