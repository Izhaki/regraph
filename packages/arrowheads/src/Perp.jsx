import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const { ceil } = Math;

const prep = (width, height, flip) => {
  const x = flip ? width : -width;
  const halfHeight = ceil(height / 2);
  return { x1: x, y1: -halfHeight, x2: x, y2: halfHeight };
};

const widthDefault = 6;
const heightDefault = 6;

const Perp = ({
  id,
  width = widthDefault,
  height = heightDefault,
  flip,
  className,
  ...others
}) => {
  const points = useMemo(() => prep(width, height, flip), [
    height,
    width,
    flip,
  ]);

  return (
    <line
      id={id}
      {...points}
      className={clsx('regraph-arrowhead', 'regraph-arrowhead-perp', className)}
      stroke="#777"
      strokeWidth={2}
      {...others}
    />
  );
};

Perp.getMarkerProps = ({
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

Perp.propTypes = {
  className: PropTypes.string,
  flip: PropTypes.bool,
  height: PropTypes.number,
  id: PropTypes.string,
  width: PropTypes.number,
};

export default Perp;
