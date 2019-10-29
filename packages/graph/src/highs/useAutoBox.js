import { useEffect, useState } from 'react';
import update from './update';
import { queryRelativeBox } from './boxQueries';
import { isRect } from '@regraph/geo/rect';

const { entries } = Object;

const fillMissingSize = boxes => {
  const missing = [];
  entries(boxes).forEach(([id, box]) => {
    if (!isRect(box)) {
      missing.push(id);
      boxes[id] = {
        width: 10,
        height: 10,
        ...box,
      };
    }
  });
  return missing;
};

export default update(props => {
  const { onBoxes } = props;
  const [stateBoxes, setStateBoxes] = useState(props.boxes);
  const updateBoxes = boxes => (onBoxes || setStateBoxes)(boxes);

  const boxes = { ...(onBoxes ? props.boxes : stateBoxes) };
  const missing = fillMissingSize(boxes);

  useEffect(() => {
    missing.forEach(id => {
      boxes[id] = queryRelativeBox(id);
    });
    updateBoxes(boxes);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    boxes,
  };
});
