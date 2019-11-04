import { useEffect, useState, useMemo } from 'react';
import update from './update';
import { queryRelativeBox } from './boxQueries';
import { isRect } from '@regraph/geo/rect';
import { isPoint } from '@regraph/geo/point';

const { keys } = Object;

const findMissing = (connections, boxes) => {
  const needsAutoBox = end => !isPoint(end) && !isRect(boxes[end.id]);
  const missing = {};
  const validConnections = connections.reduce((acc, connection) => {
    const { src, dst } = connection;
    let isValidConnection = true;
    if (needsAutoBox(src)) {
      missing[src.id] = true;
      isValidConnection = false;
    }
    if (needsAutoBox(dst)) {
      missing[dst.id] = true;
      isValidConnection = false;
    }
    if (isValidConnection) {
      acc.push(connection);
    }
    return acc;
  }, []);
  const missingIds = keys(missing);
  const hasMissing = missingIds.length > 0;
  return {
    missing: missingIds,
    connections: hasMissing ? validConnections : connections,
  };
};

export default update(props => {
  const { onBoxes } = props;
  const [stateBoxes, setStateBoxes] = useState(props.boxes);
  const updateBoxes = boxes => (onBoxes || setStateBoxes)(boxes);

  const boxes = { ...(onBoxes ? props.boxes : stateBoxes) };
  const { missing, connections } = useMemo(
    () => findMissing(props.connections, boxes),
    [boxes, props.connections]
  );

  useEffect(() => {
    if (missing.length) {
      missing.forEach(id => {
        boxes[id] = queryRelativeBox(id);
      });
      updateBoxes(boxes);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    boxes,
    connections,
  };
});
