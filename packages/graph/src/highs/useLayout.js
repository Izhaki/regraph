import { useMemo } from 'react';
import { useBoxContext } from './BoxContext';

const requestMissingBoxes = (ends = {}, boxContext) => {
  Object.values(ends).forEach(({ id, port }) => {
    boxContext.requestBox({ id, port });
  });
};

export default layout => props => {
  const boxContext = useBoxContext();
  const updates = useMemo(() => {
    const { endsMissingBoxes, ...otherUpdates } = layout(props);
    requestMissingBoxes(endsMissingBoxes, boxContext);
    return otherUpdates;
  }, layout.deps(props)); // eslint-disable-line react-hooks/exhaustive-deps
  return {
    ...props,
    ...updates,
  };
};
