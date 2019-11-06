import { useEffect, useState, useMemo, useRef } from 'react';
import update from './update';
import { queryRelativeBox } from './boxQueries';

export default update(props => {
  const { onBoxes } = props;
  const [stateBoxes, setStateBoxes] = useState(props.boxes);
  const updateBoxes = boxes => (onBoxes || setStateBoxes)(boxes);

  const boxes = onBoxes ? props.boxes : stateBoxes;
  const requests = useRef(new Map());

  const boxContext = useMemo(
    () => ({
      requestBox: request => {
        requests.current.set(request.id, request);
      },
    }),
    []
  );

  useEffect(() => {
    if (requests.current.size) {
      const newBoxes = { ...boxes };
      requests.current.forEach(({ id }) => {
        newBoxes[id] = queryRelativeBox(id);
      });
      requests.current.clear();
      updateBoxes(newBoxes);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    boxes,
    boxContext,
  };
});
