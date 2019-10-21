import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import clsx from 'clsx';
import { toElement, trim } from '@regraph/geo/line';
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
    const { type, props: elementProps } = useMemo(() => {
      const line = trim({ src, dst }, srcTrim, dstTrim);
      return toElement(line);
    }, [src, dst, srcTrim, dstTrim]);

    const line = React.createElement(type, {
      ...elementProps,
      markerStart,
      markerEnd,
      className: clsx('regraph-connection-line', className),
      stroke: '#777',
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
