import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getStrokeWidth } from './getFillSize';

const ellipse = (width, height, strokeWidth, rtl) => {
  const sign = rtl ? -1 : 1;
  const cx = (width / 2) * sign - sign;
  const cy = 0;
  const rx = (width - strokeWidth) / 2;
  const ry = (height - strokeWidth) / 2;
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
  const attrs = useMemo(
    () => ellipse(width, height, getStrokeWidth(stroke, strokeWidth), rtl),
    [height, rtl, stroke, strokeWidth, width]
  );

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
  trim: width - 1,
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
