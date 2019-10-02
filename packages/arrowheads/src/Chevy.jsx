import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const chevy = (width, height, flip) => {
  const base = flip ? width : -width;
  const halfHeight = ceil(height / 2);
  const top = { x: base, y: -halfHeight };
  const tipPoint = { x: 0, y: 0 };
  const btm = { x: base, y: halfHeight };
  return [top, tipPoint, btm];
};

const widthDefault = 6;
const heightDefault = 6;

const Chevy = ({
  id,
  width = widthDefault,
  height = heightDefault,
  flip,
  className,
  ...others
}) => {
  const points = useMemo(() => chevy(width, height, flip), [
    height,
    flip,
    width,
  ]);

  return (
    <polyline
      id={id}
      points={points.map(toSvg)}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-chevy',
        className
      )}
      stroke="#777"
      fill="none"
      {...others}
    />
  );
};

Chevy.getMarkerProps = ({
  width = widthDefault,
  height = heightDefault,
  flip,
}) => ({
  width,
  height,
  viewBox: {
    x: flip ? 0 : -width,
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
  flip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default Chevy;
