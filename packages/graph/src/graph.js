import React from 'react';
import GraphBase from './GraphBase';
import {
  useNodeDefaults,
  useNormaliseConnections,
  useAutoConnectionId,
  useLoomer,
  useBoxExtractor,
  useAutoBox,
  useHiddenFirstRender,
  useLayout,
  useAutoViewportSize,
} from './highs';
import connectionLayout, { chopBox } from './layouts/connections';
import { pipe } from './utils';

export default ({
  node,
  normalizeConnections,
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
    features.push(
      useLayout(layout === true ? connectionLayout(chopBox) : layout)
    );
  }

  if (autoViewportSize) {
    features.push(useAutoViewportSize());
  }

  return props => React.createElement(GraphBase, pipe(...features)(props));
};
