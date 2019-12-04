import { useMemo } from 'react';
import update from './update';
import { useBoxContext } from './BoxContext';

export default layout =>
  update(props => {
    const boxContext = useBoxContext();
    return useMemo(
      () => layout(props, boxContext),
      layout.deps(props) // eslint-disable-line react-hooks/exhaustive-deps
    );
  });
