import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const triangle = (width, height, flip) => {
  const tip = flip ? -width : width;
  const halfHeight = ceil(height / 2);
  const top = { x: 0, y: -halfHeight };
  const tipPoint = { x: tip, y: 0 };
  const btm = { x: 0, y: halfHeight };
  return [top, tipPoint, btm];
};

const widthDefault = 6;
const heightDefault = 6;

const Triangle = ({
  id,
  width = widthDefault,
  height = heightDefault,
  flip,
  className,
  ...others
}) => {
  const points = useMemo(() => triangle(width, height, flip), [
    height,
    flip,
    width,
  ]);

  return (
    <polygon
      id={id}
      points={points.map(toSvg)}
      className={clsx(
        'regraph-arrowhead',
        'regraph-arrowhead-triangle',
        className
      )}
      stroke="none"
      fill="#777"
      {...others}
    />
  );
};

Triangle.getMarkerProps = ({
  width = widthDefault,
  height = heightDefault,
  flip,
}) => ({
  width,
  height,
  viewBox: {
    x: flip ? -width : 0,
    y: -(height / 2),
    width,
    height,
  },
  ref: {
    x: 0,
    y: 0,
  },
  trim: width,
});

Triangle.propTypes = {
  className: PropTypes.string,
  flip: PropTypes.bool,
  height: PropTypes.number,
  id: PropTypes.string,
  others: PropTypes.object,
  width: PropTypes.number,
};

export default Triangle;
