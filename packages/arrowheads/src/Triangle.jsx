import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import flipIf from './flipIf';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const triangle = (width, height, flip) => {
  const [base, tip] = flipIf(flip, [0, width], width);
  const halfHeight = ceil(height / 2);
  const top = { x: base, y: -halfHeight };
  const tipPoint = { x: tip, y: 0 };
  const btm = { x: base, y: halfHeight };
  return [tipPoint, btm, top].map(toSvg);
};

const Triangle = ({ id, width, height, flip }) => {
  const points = useMemo(() => triangle(width, height, flip), [
    height,
    flip,
    width,
  ]);

  return <polyline id={id} points={points} fill="#777" />;
};

Triangle.propTypes = {
  flip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default Triangle;
