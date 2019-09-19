import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import flipIf from './flipIf';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const triangle = (width, height, flip) => {
  const [base, tip] = flipIf(flip, [0, width], width);
  const halfHeight = ceil(height / 2);
  const top = { x: base, y: -halfHeight };
  const tipPoint = { x: tip, y: 0 };
  const btm = { x: base, y: halfHeight };
  return [top, tipPoint, btm];
};

const Triangle = ({ id, width, height, flip, className, presentation }) => {
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
      {...presentation}
    />
  );
};

Triangle.propTypes = {
  className: PropTypes.string,
  flip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  presentation: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default Triangle;
