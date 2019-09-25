import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import flipIf from './flipIf';
import clsx from 'clsx';

const { ceil } = Math;

const prep = (width, height, flip) => {
  const [x] = flipIf(flip, [0], width);
  const halfHeight = ceil(height / 2);
  return { x1: x, y1: -halfHeight, x2: x, y2: halfHeight };
};

const Perp = ({ id, width, height, flip, className, presentation }) => {
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
      {...presentation}
    />
  );
};

Perp.getMarkerProps = () => ({
  anchor: 1,
});

Perp.propTypes = {
  className: PropTypes.string,
  flip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  presentation: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default Perp;
