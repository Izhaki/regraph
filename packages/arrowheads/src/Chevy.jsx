import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const chevy = (width, height, rtl) => {
  const base = rtl ? width : -width;
  const halfHeight = ceil(height / 2);
  const top = { x: base, y: -halfHeight };
  const tipPoint = { x: 0, y: 0 };
  const btm = { x: base, y: halfHeight };
  return [top, tipPoint, btm];
};

const defaults = {
  width: 6,
  height: 6,
  stroke: '#777',
};

const Chevy = ({
  id,
  width = defaults.width,
  height = defaults.height,
  stroke = defaults.stroke,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => chevy(width, height, rtl), [height, rtl, width]);

  return (
    <polyline
      id={id}
      points={points.map(toSvg)}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-chevy',
        className
      )}
      stroke={stroke}
      fill="none"
      {...others}
    />
  );
};

Chevy.getMarkerProps = ({
  width = defaults.width,
  height = defaults.height,
  rtl,
}) => ({
  width,
  height,
  viewBox: {
    x: rtl ? 0 : -width,
    y: -(height / 2),
    width,
    height,
  },
  anchor: {
    x: 0,
    y: 0,
  },
  trim: 0,
});

Chevy.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  stroke: PropTypes.string,
  width: PropTypes.number,
};

export default Chevy;
