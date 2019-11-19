import { useEffect, useState, useRef } from 'react';
import { queryRelativeBox } from './boxQueries';
import useForceUpdate from './useForceUpdate';
import { isRect, transpose } from '@regraph/geo/rect';

export default ({ onBoxes, boxes: inBoxes }, graphRef) => {
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
      const graphElement = graphRef.current;
      const graphBox = graphElement.getBoundingClientRect();

      const newBoxes = { ...outBoxes };
      requests.forEach(request => {
        const { id, port } = request;
        if (!isRect(newBoxes[id])) {
          newBoxes[id] = queryRelativeBox(request, graphBox);
        }
        if (port) {
          const portId = `${id}/${port}`;
          if (!isRect(newBoxes[portId])) {
            const parentBox = newBoxes[id];
            const box = queryRelativeBox({ id: portId }, graphBox);
            box.x -= parentBox.x;
            box.y -= parentBox.y;
            box.parent = id;
            newBoxes[portId] = box;
          }
        }
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
