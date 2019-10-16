import React from 'react';
import PropTypes from 'prop-types';
import GraphBase from './GraphBase';
import { useAutoViewportSize, useLayout } from './highs';
import connectionLayout, { chopBox } from './layouts/connections';
import { compose } from './utils';

const Graph = ({
  viewportPadding,
  layout = connectionLayout(chopBox),
  ...others
}) => {
  const props = compose(
    useAutoViewportSize(viewportPadding),
    useLayout(layout)
  )(others);
  return <GraphBase {...props} />;
};

Graph.propTypes = {
  layout: PropTypes.func,
  viewportPadding: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default Graph;
