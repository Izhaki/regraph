import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const { ceil } = Math;

const ellipse = (width, height, rtl) => {
  const rx = ceil(width / 2);
  const ry = ceil(height / 2);
  const cx = rtl ? -rx : rx;
  const cy = 0;
  return { cx, cy, rx, ry };
};

const widthDefault = 6;
const heightDefault = 6;

const Ellipse = ({
  id,
  width = widthDefault,
  height = heightDefault,
  rtl,
  className,
  ...others
}) => {
  const attrs = useMemo(() => ellipse(width, height, rtl), [
    height,
    rtl,
    width,
  ]);

  return (
    <ellipse
      id={id}
      {...attrs}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-ellipse',
        className
      )}
      stroke="none"
      fill="#777"
      {...others}
    />
  );
};

Ellipse.getMarkerProps = ({
  width = widthDefault,
  height = heightDefault,
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
  width: PropTypes.number,
};

export default Ellipse;
