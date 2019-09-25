import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import flipIf from './flipIf';
import { toSvg } from '@regraph/geo/point';

const { ceil } = Math;

const chevy = (width, height, flip) => {
  const [base, tip] = flipIf(flip, [0, width], width);
  const halfHeight = ceil(height / 2);
  const top = { x: base, y: -halfHeight };
  const tipPoint = { x: tip, y: 0 };
  const btm = { x: base, y: halfHeight };
  return [top, tipPoint, btm];
};

const Chevy = ({ id, width, height, flip, className, presentation }) => {
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
      {...presentation}
    />
  );
};

Chevy.getMarkerProps = () => ({
  anchor: 1,
});

Chevy.propTypes = {
  className: PropTypes.string,
  flip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  presentation: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default Chevy;
