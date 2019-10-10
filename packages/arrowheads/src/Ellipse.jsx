import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import getFillSize from './getFillSize';

const ellipse = (width, height, rtl) => {
  const rx = width / 2;
  const ry = height / 2;
  const cx = rtl ? -rx : rx;
  const cy = 0;
  return { cx, cy, rx, ry };
};

const defaults = {
  width: 6,
  height: 6,
};

const Ellipse = ({
  id,
  width = defaults.width,
  height = defaults.height,
  stroke,
  strokeWidth,
  rtl,
  className,
  ...others
}) => {
  const attrs = useMemo(() => {
    const [w, h] = getFillSize(width, height, stroke, strokeWidth);
    return ellipse(w, h, rtl);
  }, [height, rtl, stroke, strokeWidth, width]);

  return (
    <ellipse
      id={id}
      {...attrs}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-ellipse',
        className
      )}
      stroke={stroke}
      fill="#777"
      {...others}
    />
  );
};

Ellipse.getMarkerProps = ({
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

Ellipse.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
};

export default Ellipse;
