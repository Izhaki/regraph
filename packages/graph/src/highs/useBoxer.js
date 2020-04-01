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

const getBoxReducer = (boxes, graphBox) => (newBoxes, request) => {
  const { id, port } = request;

  if (port) {
    const portId = `${id}/${port}`;
    const parentBox = newBoxes[id] || boxes[id];
    const box = queryRelativeBox({ id: portId }, graphBox);
    box.x -= parentBox.x;
    box.y -= parentBox.y;
    box.parent = id;
    newBoxes[portId] = box;
  } else {
    newBoxes[id] = queryRelativeBox(request, graphBox);
  }
  return newBoxes;
};

export default (inBoxes, boxRequests = [], onBoxes, graphRef) => {
  const forceUpdate = useForceUpdate();
  const [stateBoxes, setStateBoxes] = useState(inBoxes);

  const [boxes, updateBoxes] = onBoxes
    ? [inBoxes, onBoxes]
    : [stateBoxes, newBoxes => setStateBoxes({ ...boxes, ...newBoxes })];

  const originalBoxes = useRef(inBoxes).current;

  if (process.env.NODE_ENV !== 'production') {
    if (!onBoxes && inBoxes !== originalBoxes) {
      console.error(`Regraph: New boxes in props but no onBoxes.`);
    }
  }

  const requests = useRef(new Map()).current;

  // Add box requests from parent components
  boxRequests.forEach(addRequest(requests));

  // Box context allows children to make requests
  const boxContext = useRef({
    requestBox: request => {
      addRequest(requests)(request);
      forceUpdate();
    },
  }).current;

  // After rendering get the boxes for all requests
  useEffect(() => {
    if (requests.size) {
      const graphBox = graphRef.current.getBoundingClientRect();
      const requestsArray = Array.from(requests.values());
      const newBoxes = requestsArray.reduce(getBoxReducer(boxes, graphBox), {});
      requests.clear();
      updateBoxes(newBoxes);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    boxes,
    boxContext,
  };
};
