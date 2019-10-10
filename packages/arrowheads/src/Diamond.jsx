import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const diamond = (width, height, rtl) => {
  const sign = rtl ? -1 : 1;
  const halfHeight = ceil(height / 2);
  const halfWidth = ceil(width / 2);
  const base = { x: 0, y: 0 };
  const top = { x: sign * halfWidth, y: -halfHeight };
  const tip = { x: sign * width, y: 0 };
  const btm = { x: sign * halfWidth, y: halfHeight };
  return [base, top, tip, btm];
};

const defaults = {
  width: 10,
  height: 5,
};

const Diamond = ({
  id,
  width = defaults.width,
  height = defaults.height,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => diamond(width, height, rtl), [
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
        'regraph-arrowhead-diamond',
        className
      )}
      stroke="none"
      fill="#777"
      {...others}
    />
  );
};

Diamond.getMarkerProps = ({
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

Diamond.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  width: PropTypes.number,
};

export default Diamond;
