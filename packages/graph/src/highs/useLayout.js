import { useMemo } from 'react';
import { useBoxContext } from './BoxContext';

export default layout => props => {
  const boxContext = useBoxContext();
  return useMemo(
    () => layout(props, boxContext),
    layout.deps(props) // eslint-disable-line react-hooks/exhaustive-deps
  );
};
