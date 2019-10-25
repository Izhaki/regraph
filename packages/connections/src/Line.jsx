import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import clsx from 'clsx';
import {
  toElement as lineToElement,
  trim as trimLine,
} from '@regraph/geo/line';
import {
  fromBentLine,
  toElement as quadToElement,
  trim as trimQuad,
} from '@regraph/geo/quadratic';
import withConnection from './withConnection';

const Line = React.memo(
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
      if (bend || c1) {
        // c1 may already be calculated by the layout
        const quad = c1 ? { src, c1, dst } : fromBentLine({ src, dst }, bend);
        const trimmed = trimQuad(quad, srcTrim, dstTrim);
        return quadToElement(trimmed);
      }
      const line = trimLine({ src, dst }, srcTrim, dstTrim);
      return lineToElement(line);
    }, [bend, src, dst, srcTrim, dstTrim, c1]);

    const line = React.createElement(type, {
      ...elementProps,
      markerStart,
      markerEnd,
      className: clsx('regraph-connection-line', className),
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
        {line}
        {overlay}
      </>
    );
  }
);

Line.propTypes = {
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

export default withConnection(Line);
