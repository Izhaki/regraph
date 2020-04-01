import { useEffect, useState, useRef } from 'react';
import { queryRelativeBox } from './boxQueries';
import useForceUpdate from './useForceUpdate';

const addRequest = requests => request => {
  // Add the node
  const { port, ...nodeRequest } = request;
  requests.set(nodeRequest.id, nodeRequest);
  // Add the port if needed
  if (port) {
    const portId = `${request.id}/${port}`;
    requests.set(portId, request);
  }
};

export default (inBoxes, boxRequests = [], onBoxes, graphRef) => {
  const forceUpdate = useForceUpdate();
  const [stateBoxes, setStateBoxes] = useState(inBoxes);

  const outBoxes = onBoxes ? inBoxes : stateBoxes;

  const updateBoxes = newBoxes =>
    onBoxes ? onBoxes(newBoxes) : setStateBoxes({ ...outBoxes, ...newBoxes });

  const originalBoxes = useRef(inBoxes).current;
  if (process.env.NODE_ENV !== 'production') {
    if (!onBoxes && inBoxes !== originalBoxes) {
      console.error(`Regraph: New boxes in props but no onBoxes.`);
    }
  }

  const requests = useRef(new Map()).current;

  // Add box requests from parent components
  boxRequests.forEach(addRequest(requests));

  const boxContext = useRef({
    requestBox: request => {
      // Add box requests from child components
      addRequest(requests)(request);
      forceUpdate();
    },
  }).current;

  useEffect(() => {
    if (requests.size) {
      const graphElement = graphRef.current;
      const graphBox = graphElement.getBoundingClientRect();

      const newBoxes = {};
      requests.forEach(request => {
        const { id, port } = request;

        if (port) {
          const portId = `${id}/${port}`;
          const parentBox = newBoxes[id] || outBoxes[id];
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
