import React, { useState, useRef, useEffect } from 'react';
import { graph, withHtmlPosition, useBoxContext } from '@regraph/graph';
import { Line } from '@regraph/connections';
import ContentEditable from 'react-contenteditable';
import styles from './styles';

const TextRect = withHtmlPosition(({ id, title }) => {
  const [content, setContent] = useState(title);
  const ref = useRef(null);
  const { requestBox } = useBoxContext();

  useEffect(() => {
    requestBox({ id, element: ref.current });
  }, [content, id, requestBox]);

  return (
    <div id={id} ref={ref} style={styles.rect}>
      <ContentEditable
        html={content}
        onChange={event => {
          setContent(event.target.value);
        }}
        style={styles.text}
      />
    </div>
  );
});

const Graph = graph({
  boxer: true,
  normalizeConnections: true,
  layout: true,
  autoViewportSize: true,
  defaults: {
    node: { type: TextRect },
    connection: {
      type: Line,
      strokeWidth: 1,
    },
  },
});

export default () => (
  <Graph
    nodeLayer="html"
    nodes={[
      { id: 'editable1', title: `Click me. I'm editable.` },
      { id: 'editable2', title: `Me too!` },
    ]}
    boxes={{
      editable1: { x: 40, y: 40 },
      editable2: { x: 40, y: 140 },
    }}
    connections={[
      {
        id: 'connection',
        src: 'editable1',
        dst: 'editable2',
      },
    ]}
  />
);
