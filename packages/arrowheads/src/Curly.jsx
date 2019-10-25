import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import getFillSize from './getFillSize';
import { toSvg } from '@regraph/geo/point';

const curly = (width, height, rtl) => {
  const sign = rtl ? -1 : 1;
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const base = sign * width;
  const xMid = base - sign * halfWidth;

  const top = { x: base, y: -halfHeight };
  const cTop = { x: xMid, y: -halfHeight };
  const midTop = { x: xMid, y: -halfHeight + halfWidth };
  const midTipTop = { x: xMid, y: -halfWidth };
  const tip = { x: 0, y: 0 };
  const cTip = { x: xMid, y: 0 };
  const midTipBtm = { x: xMid, y: halfWidth };
  const midBtm = { x: xMid, y: halfHeight - halfWidth };
  const cBtm = { x: xMid, y: halfHeight };
  const btm = { x: base, y: halfHeight };

  return `
    M ${toSvg(top)}
    Q ${toSvg(cTop)} ${toSvg(midTop)}
    L ${toSvg(midTipTop)}
    Q ${toSvg(cTip)} ${toSvg(tip)}
    Q ${toSvg(cTip)} ${toSvg(midTipBtm)}
    L ${toSvg(midBtm)}
    Q ${toSvg(cBtm)} ${toSvg(btm)}
  `;
};

const defaults = {
  width: 6,
  height: 12,
  stroke: 'inherent',
};

const Curly = ({
  id,
  width = defaults.width,
  height = defaults.height,
  stroke = defaults.stroke,
  strokeWidth,
  rtl,
  className,
  ...others
}) => {
  const drawCommand = useMemo(() => {
    const [w, h] = getFillSize(width, height, stroke, strokeWidth);
    return curly(w, h, rtl);
  }, [height, rtl, stroke, strokeWidth, width]);

  return (
    <path
      id={id}
      d={drawCommand}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-curly',
        className
      )}
      stroke={stroke}
      fill="none"
      {...others}
    />
  );
};

Curly.getMarkerProps = ({
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
  trim: width,
});

Curly.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  id: PropTypes.string,
  rtl: PropTypes.bool,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
};

export default Curly;
