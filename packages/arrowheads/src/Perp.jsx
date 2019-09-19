import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const { ceil } = Math;

const prep = (width, height) => {
  const halfHeight = ceil(height / 2);
  return { x1: width, y1: -halfHeight, x2: width, y2: halfHeight };
};

const Perp = ({ id, width, height, className, presentation }) => {
  const points = useMemo(() => prep(width, height), [height, width]);

  return (
    <line
      id={id}
      {...points}
      className={clsx('regraph-arrowhead', 'regraph-arrowhead-perp', className)}
      stroke="#777"
      strokeWidth={2}
      {...presentation}
    />
  );
};

Perp.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  presentation: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default Perp;
