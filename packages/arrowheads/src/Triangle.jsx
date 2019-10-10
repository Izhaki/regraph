import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const triangle = (width, height, rtl) => {
  const halfHeight = ceil(height / 2);
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
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => triangle(width, height, rtl), [
    height,
    rtl,
    width,
  ]);

  return (
    <polygon
      id={id}
      points={points.map(toSvg)}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-triangle',
        className
      )}
      stroke="none"
      fill="#777"
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
  width: PropTypes.number,
};

export default Triangle;
