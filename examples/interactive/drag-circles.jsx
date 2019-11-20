import React, { useState, useRef } from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';
import { transpose } from '@regraph/geo/rect';

const Circle = ({ id, box }) => (
  <ellipse id={id} {...toSvgProps(fromRect(box))} />
);

const Graph = graph({
  interactive: true,
  layout: true,
  node: { type: Circle },
  connection: {
    type: Line,
    strokeWidth: 1,
    dst: { anchor: 'chop-ellipse', marker: <Triangle /> },
    src: { anchor: 'chop-ellipse' },
  },
});

export default () => {
  const [boxes, setBoxes] = useState({
    ping: { x: 200 - 15, y: 100 - 15, width: 30, height: 30 },
    pong: { x: 400 - 15, y: 100 - 15, width: 30, height: 30 },
  });

  const dragged = useRef(null);

  const onDragStart = ({ target: { id } }) => {
    if (boxes[id]) {
      dragged.current = id;
    }
  };

  const onDrag = ({ delta }) => {
    const boxId = dragged.current;
    if (boxId) {
      setBoxes({
        ...boxes,
        [boxId]: transpose(boxes[boxId], delta),
      });
    }
  };

  const onDragEnd = () => {
    dragged.current = null;
  };

  return (
    <Graph
      width={600}
      height={200}
      nodes={[{ id: 'ping' }, { id: 'pong' }]}
      boxes={boxes}
      connections={[
        { id: 'ping->pong', src: { id: 'ping' }, dst: { id: 'pong' } },
      ]}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    />
  );
};
