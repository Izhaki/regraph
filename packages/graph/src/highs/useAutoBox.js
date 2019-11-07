import { useEffect, useState, useRef } from 'react';
import { queryRelativeBox } from './boxQueries';
import useForceUpdate from './useForceUpdate';

export default ({ onBoxes, boxes: inBoxes }) => {
  const forceUpdate = useForceUpdate();
  const [stateBoxes, setStateBoxes] = useState(inBoxes);
  const updateBoxes = onBoxes || setStateBoxes;

  const outBoxes = onBoxes ? inBoxes : stateBoxes;
  const requests = useRef(new Map()).current;

  const boxContext = useRef({
    requestBox: request => {
      requests.set(request.id, request);
      forceUpdate();
    },
  }).current;

  useEffect(() => {
    if (requests.size) {
      const newBoxes = { ...outBoxes };
      requests.forEach(request => {
        newBoxes[request.id] = queryRelativeBox(request);
      });
      requests.clear();
      updateBoxes(newBoxes);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    boxes: outBoxes,
    boxContext,
  };
};
