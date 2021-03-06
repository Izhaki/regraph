import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { PointPropTypes } from '@regraph/core';
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

const pointFrom = ({ x, y }) => ({ x, y });
const getShape = ({ bend, src, dst }) =>
  bend
    ? fromBentLine({ type: 'quad', src, dst }, bend)
    : { type: 'line', src, dst };

const getTrimmedElement = {
  quad: (shape, srcTrim, dstTrim) =>
    quadToElement(trimQuad(shape, srcTrim, dstTrim)),
  line: (shape, srcTrim, dstTrim) =>
    lineToElement(trimLine(shape, srcTrim, dstTrim)),
};

const Line = React.memo(
  ({
    id,
    src,
    dst,
    bend = 0,
    markerStart,
    markerEnd,
    srcTrim,
    dstTrim,
    targeting,
    selected,
    className,
    strokeWidth,
    ...others
  }) => {
    const { type, props: elementProps } = useMemo(() => {
      const shape = getShape({
        bend,
        // src and dst are read-only, so extract points
        src: pointFrom(src),
        dst: pointFrom(dst),
      });
      return getTrimmedElement[shape.type](shape, srcTrim, dstTrim);
    }, [bend, dst, dstTrim, src, srcTrim]);

    const line = React.createElement(type, {
      ...elementProps,
      markerStart,
      markerEnd,
      className: clsx(
        'regraph-connection-line',
        className,
        selected && 'regraph-selected'
      ),
      fill: 'none',
      style: { strokeWidth },
      ...others,
    });

    const overlay =
      targeting &&
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

Line.getShape = getShape;

Line.propTypes = {
  bend: PropTypes.number,
  c1: PointPropTypes,
  className: PropTypes.string,
  dst: PointPropTypes.isRequired,
  dstTrim: PropTypes.number,
  id: PropTypes.string,
  markerEnd: PropTypes.string,
  markerStart: PropTypes.string,
  selected: PropTypes.bool,
  src: PointPropTypes.isRequired,
  srcTrim: PropTypes.number,
  strokeWidth: PropTypes.number,
  targeting: PropTypes.object,
};

export default withConnection(Line);
