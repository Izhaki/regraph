import { useMemo } from 'react';
import { useBoxContext } from './BoxContext';

const requestMissingBoxes = (ends = {}, boxContext) => {
  Object.values(ends).forEach(({ id, port }) => {
    boxContext.requestBox({ id, port });
  });
};

export default layout => props => {
  const boxContext = useBoxContext();
  return useMemo(
    () => {
      const { endsMissingBoxes, ...outProps } = layout(props);
      requestMissingBoxes(endsMissingBoxes, boxContext);
      return outProps;
    },
    layout.deps(props) // eslint-disable-line react-hooks/exhaustive-deps
  );
};
