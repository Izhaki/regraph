import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const { ceil } = Math;

const prep = (width, height, rtl) => {
  const x = rtl ? width : -width;
  const halfHeight = ceil(height / 2);
  return { x1: x, y1: -halfHeight, x2: x, y2: halfHeight };
};

const defaults = {
  width: 6,
  height: 6,
};

const Perp = ({
  id,
  width = defaults.width,
  height = defaults.height,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => prep(width, height, rtl), [height, width, rtl]);

  return (
    <line
      id={id}
      {...points}
      className={clsx('regraph-arrowhead', 'regraph-arrowhead-perp', className)}
      strokeWidth={1}
      fill="none"
      {...others}
    />
  );
};

Perp.getMarkerProps = ({
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

Perp.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  width: PropTypes.number,
};

export default Perp;
