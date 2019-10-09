import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const barbed = (width, height, inset, rtl) => {
  const sign = rtl ? -1 : 1;
  const halfHeight = ceil(height / 2);
  const xBarb = -(inset * width);
  const xTip = (1 - inset) * width;
  const anchor = { x: 0, y: 0 };
  const top = { x: sign * xBarb, y: -halfHeight };
  const tip = { x: sign * xTip, y: 0 };
  const btm = { x: sign * xBarb, y: halfHeight };
  return [anchor, top, tip, btm];
};

const widthDefault = 6;
const heightDefault = 6;
const insetDefault = 0.5;

const Barbed = ({
  id,
  width = widthDefault,
  height = heightDefault,
  inset = insetDefault,
  rtl,
  className,
  ...others
}) => {
  const points = useMemo(() => barbed(width, height, inset, rtl), [
    height,
    inset,
    rtl,
    width,
  ]);

  return (
    <polygon
      id={id}
      points={points.map(toSvg)}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-barbed',
        className
      )}
      strokeLinejoin="miter"
      stroke="none"
      fill="#777"
      {...others}
    />
  );
};

Barbed.getMarkerProps = ({
  width = widthDefault,
  height = heightDefault,
  inset = insetDefault,
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
  width: PropTypes.number,
};

export default Barbed;
