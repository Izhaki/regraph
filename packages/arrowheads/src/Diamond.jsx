import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import getFillSize from './getFillSize';
import { toSvg } from '@regraph/geo/point';

const diamond = (width, height, rtl) => {
  const sign = rtl ? -1 : 1;
  const halfHeight = height / 2;
  const halfWidth = width / 2;
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
  stroke,
  strokeWidth,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => {
    const [w, h] = getFillSize(width, height, stroke, strokeWidth);
    return diamond(w, h, rtl).map(toSvg);
  }, [height, rtl, stroke, strokeWidth, width]);

  return (
    <polygon
      id={id}
      points={points}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-diamond',
        className
      )}
      stroke={stroke}
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
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
};

export default Diamond;
