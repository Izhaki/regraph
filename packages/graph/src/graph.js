import React from 'react';
import GraphBase from './GraphBase';
import {
  useNodeDefaults,
  useNormaliseConnections,
  useConnectionDefaults,
  useAutoConnectionId,
  useLoomer,
  useBoxExtractor,
  useAutoBox,
  useHiddenFirstRender,
  useLayout,
  useAutoViewportSize,
} from './highs';
import connectionLayout from './layouts/connections';
import { pipe } from './utils';

export default ({
  node,
  normalizeConnections,
  connection,
  autoConnectionId,
  looms,
  extractBoxesFromNodes,
  autoBox,
  hiddenFirstRender,
  layout,
  autoViewportSize,
}) => {
  const features = [];

  if (node) {
    features.push(useNodeDefaults(node));
  }

  if (normalizeConnections) {
    features.push(useNormaliseConnections);
  }

  if (connection) {
    features.push(useConnectionDefaults(connection));
  }

  if (autoConnectionId) {
    features.push(useAutoConnectionId);
  }

  if (looms) {
    features.push(useLoomer());
  }

  if (extractBoxesFromNodes) {
    features.push(useBoxExtractor);
  }

  if (autoBox) {
    features.push(useAutoBox);
  }

  if (hiddenFirstRender) {
    features.push(useHiddenFirstRender);
  }

  if (layout) {
    features.push(useLayout(layout === true ? connectionLayout : layout));
  }

  if (autoViewportSize) {
    features.push(useAutoViewportSize());
  }

  return props => React.createElement(GraphBase, pipe(...features)(props));
};
