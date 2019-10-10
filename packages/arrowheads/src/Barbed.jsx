import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import getFillSize from './getFillSize';
import { toSvg } from '@regraph/geo/point';

const barbed = (width, height, inset, rtl) => {
  const sign = rtl ? -1 : 1;
  const halfHeight = height / 2;
  const xBarb = -(inset * width);
  const xTip = (1 - inset) * width;
  const anchor = { x: 0, y: 0 };
  const top = { x: sign * xBarb, y: -halfHeight };
  const tip = { x: sign * xTip, y: 0 };
  const btm = { x: sign * xBarb, y: halfHeight };
  return [anchor, top, tip, btm];
};

const defaults = {
  width: 6,
  height: 6,
  inset: 0.25,
};

const Barbed = ({
  id,
  width = defaults.width,
  height = defaults.height,
  inset = defaults.inset,
  stroke,
  strokeWidth,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => {
    const [w, h] = getFillSize(width, height, stroke, strokeWidth);
    return barbed(w, h, inset, rtl).map(toSvg);
  }, [height, inset, rtl, stroke, strokeWidth, width]);

  return (
    <polygon
      id={id}
      points={points}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-barbed',
        className
      )}
      stroke={stroke}
      fill="#777"
      {...others}
    />
  );
};

Barbed.getMarkerProps = ({
  width = defaults.width,
  height = defaults.height,
  inset = defaults.inset,
  rtl,
}) => ({
  width,
  height,
  viewBox: {
    x: rtl ? -(1 - inset) * width : -(inset * width),
    y: -(height / 2),
    width,
    height,
  },
  anchor: {
    x: 0,
    y: 0,
  },
  trim: (1 - inset) * width,
});

Barbed.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  inset: PropTypes.number,
  rtl: PropTypes.bool,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
};

export default Barbed;
