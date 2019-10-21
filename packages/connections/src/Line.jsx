/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import clsx from 'clsx';
import { getSvgCoordinates, trim } from '@regraph/geo/line';
import withConnection from './withConnection';

const Line = React.memo(
  ({
    src,
    dst,
    markerStart,
    markerEnd,
    srcTrim,
    dstTrim,
    selectable,
    className,
    strokeWidth,
    ...others
  }) => {
    const coordinates = useMemo(() => {
      const line = trim({ src, dst }, srcTrim, dstTrim);
      return getSvgCoordinates(line);
    }, [src, dst, srcTrim, dstTrim]);

    return (
      <>
        <line
          {...coordinates}
          markerStart={markerStart}
          markerEnd={markerEnd}
          className={clsx('regraph-connection-line', className)}
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
      </>
    );
  }
);

Line.propTypes = {
  className: PropTypes.string,
  dst: PointPropTypes.isRequired,
  dstTrim: PropTypes.number,
  markerEnd: PropTypes.string,
  markerStart: PropTypes.string,
  selectable: PropTypes.bool,
  src: PointPropTypes.isRequired,
  srcTrim: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default withConnection(Line);
