import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import getFillSize from './getFillSize';
import { toSvg } from '@regraph/geo/point';

const triangle = (width, height, rtl) => {
  const halfHeight = height / 2;
  const top = { x: 0, y: -halfHeight };
  const tip = { x: rtl ? -width : width, y: 0 };
  const btm = { x: 0, y: halfHeight };
  return [top, tip, btm];
};

const defaults = {
  width: 6,
  height: 6,
};

const Triangle = ({
  id,
  width = defaults.width,
  height = defaults.height,
  stroke = 'none',
  strokeWidth,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => {
    const [w, h] = getFillSize(width, height, stroke, strokeWidth);
    return triangle(w, h, rtl).map(toSvg);
  }, [height, rtl, stroke, strokeWidth, width]);

  return (
    <polygon
      id={id}
      points={points}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-triangle',
        className
      )}
      stroke={stroke}
      {...others}
    />
  );
};

Triangle.getMarkerProps = ({
  width = defaults.width,
  height = defaults.height,
  rtl,
}) => ({
  width,
  height,
  viewBox: {
    x: rtl ? -width : 0,
    y: -(height / 2),
    width,
    height,
  },
  anchor: {
    x: 0,
    y: 0,
  },
  trim: width,
});

Triangle.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
};

export default Triangle;
