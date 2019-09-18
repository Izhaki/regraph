import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const { ceil } = Math;

const prep = (width, height) => {
  const halfHeight = ceil(height / 2);
  return { x1: width, y1: -halfHeight, x2: width, y2: halfHeight };
};

const Perp = ({ id, width, height }) => {
  const points = useMemo(() => prep(width, height), [height, width]);

  return <line id={id} {...points} stroke="#777" strokeWidth={2} />;
};

Perp.propTypes = {
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default Perp;
