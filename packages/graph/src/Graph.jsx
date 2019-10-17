import React from 'react';
import PropTypes from 'prop-types';
import GraphBase from './GraphBase';
import {
  useAutoViewportSize,
  useAutoConnectionId,
  useBoxExtractor,
  useLayout,
  useNormaliseConnections,
} from './highs';
import connectionLayout, { chopBox } from './layouts/connections';
import { pipe } from './utils';

const Graph = ({
  viewportPadding,
  layout = connectionLayout(chopBox),
  ...others
}) => {
  const props = pipe(
    useNormaliseConnections,
    useAutoConnectionId,
    useBoxExtractor,
    useLayout(layout),
    useAutoViewportSize(viewportPadding)
  )(others);
  return <GraphBase {...props} />;
};

Graph.propTypes = {
  layout: PropTypes.func,
  viewportPadding: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default Graph;
