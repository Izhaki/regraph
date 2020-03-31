import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import useAutoBox from './useAutoBox';
import { BoxContext } from './BoxContext';
import { useForkRef } from './interaction/useMouseAway/refUtils';

export default WraapedComponent => {
  const WithAutoBox = forwardRef(function WithAutoBox(
    { boxes: inBoxes, onBoxes, boxRequests, ...props },
    ref
  ) {
    const boxerRef = useRef(null);
    const forkedRef = useForkRef(boxerRef, ref);
    const { boxes, boxContext } = useAutoBox(
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

  WithAutoBox.propTypes = {
    boxes: PropTypes.object,
    boxRequests: PropTypes.array,
    onBoxes: PropTypes.func,
  };

  return WithAutoBox;
};
