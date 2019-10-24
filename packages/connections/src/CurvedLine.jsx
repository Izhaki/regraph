import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import clsx from 'clsx';
import { fromBentLine, toElement, trim } from '@regraph/geo/quadratic';
import withConnection from './withConnection';

const CurvedLine = React.memo(
  ({
    src,
    dst,
    bend = 0,
    markerStart,
    markerEnd,
    srcTrim,
    dstTrim,
    selectable,
    className,
    strokeWidth,
    ...others
  }) => {
    const { type, props: elementProps } = useMemo(() => {
      const quad = trim(fromBentLine({ src, dst }, bend), srcTrim, dstTrim);
      return toElement(quad);
    }, [src, dst, bend, srcTrim, dstTrim]);

    const curve = React.createElement(type, {
      ...elementProps,
      markerStart,
      markerEnd,
      className: clsx('regraph-connection-curved-line', className),
      stroke: '#777',
      fill: 'none',
      style: { strokeWidth },
      ...others,
    });

    const overlay =
      selectable &&
      React.createElement(type, {
        ...elementProps,
        className: 'regraph-connection-overlay',
      });

    return (
      <>
        {curve}
        {overlay}
      </>
    );
  }
);

CurvedLine.propTypes = {
  bend: PropTypes.number,
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

export default withConnection(CurvedLine);
