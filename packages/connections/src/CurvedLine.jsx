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
    c1,
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
      // c1 may already be calculated by the layout
      const quad = c1 ? { src, c1, dst } : fromBentLine({ src, dst }, bend);
      const trimmedQuad = trim(quad, srcTrim, dstTrim);
      return toElement(trimmedQuad);
    }, [c1, src, dst, bend, srcTrim, dstTrim]);

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
  c1: PointPropTypes,
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
