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

const Chevy = ({ id, width, height, flip, className, ...others }) => {
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

Chevy.getMarkerProps = ({ width, height, flip }) => ({
  width,
  height,
  viewBox: {
    x: flip ? 0 : -width,
    y: -(height / 2),
    width,
    height,
  },
  ref: {
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
