import React from 'react';
import GraphBase from './GraphBase';
import { useAutoViewportSize } from './highs';

const Graph = props => {
  const newProps = useAutoViewportSize()(props);
  return <GraphBase {...newProps} />;
};

export default Graph;
