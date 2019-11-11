import React from 'react';
import useAutoBox from './useAutoBox';
import { BoxContext } from './BoxContext';

export default WraapedComponent => {
  const WithAutoBox = props => {
    const ref = React.createRef();
    const { boxes, boxContext } = useAutoBox(props, ref);

    return (
      <BoxContext.Provider value={boxContext}>
        <WraapedComponent forwardedRef={ref} {...props} boxes={boxes} />
      </BoxContext.Provider>
    );
  };

  return WithAutoBox;
};
