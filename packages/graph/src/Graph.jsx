import React from 'react';
import PropTypes from 'prop-types';
import GraphBase from './GraphBase';
import { useAutoViewportSize } from './highs';

const Graph = ({ viewportPadding, ...others }) => {
  const props = useAutoViewportSize(viewportPadding)(others);
  return <GraphBase {...props} />;
};

Graph.propTypes = {
  viewportPadding: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default Graph;
