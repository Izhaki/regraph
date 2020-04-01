import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import useBoxer from './useBoxer';
import { BoxContext } from './BoxContext';
import { useForkRef } from './interaction/useMouseAway/refUtils';

export default WraapedComponent => {
  const WithBoxer = forwardRef(function WithBoxer(
    { boxes: inBoxes, onBoxes, boxRequests, ...props },
    ref
  ) {
    const boxerRef = useRef(null);
    const forkedRef = useForkRef(boxerRef, ref);
    const { boxes, boxContext } = useBoxer(
      inBoxes,
      boxRequests,
      onBoxes,
      boxerRef
    );

    return (
      <BoxContext.Provider value={boxContext}>
        <WraapedComponent ref={forkedRef} {...props} boxes={boxes} />
      </BoxContext.Provider>
    );
  });

  WithBoxer.propTypes = {
    boxes: PropTypes.object,
    boxRequests: PropTypes.array,
    onBoxes: PropTypes.func,
  };

  return WithBoxer;
};
