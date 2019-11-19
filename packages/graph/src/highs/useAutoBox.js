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
      // Add the node
      const { port, ...nodeRequest } = request;
      requests.set(nodeRequest.id, nodeRequest);
      // Add the port if needed
      if (port) {
        const portId = `${request.id}/${port}`;
        requests.set(portId, request);
      }
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

        if (port) {
          const portId = `${id}/${port}`;
          const parentBox = newBoxes[id];
          const box = queryRelativeBox({ id: portId }, graphBox);
          box.x -= parentBox.x;
          box.y -= parentBox.y;
          box.parent = id;
          newBoxes[portId] = box;
        } else {
          newBoxes[id] = queryRelativeBox(request, graphBox);
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
