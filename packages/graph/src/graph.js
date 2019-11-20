import { forwardRef, createElement } from 'react';
import GraphBase from './GraphBase';
import {
  useNodeDefaults,
  useNormaliseConnections,
  useConnectionDefaults,
  useAutoConnectionId,
  useLoomer,
  useBoxExtractor,
  useHiddenFirstRender,
  useLayout,
  useAutoViewportSize,
  withAutoBox,
  withInteraction,
} from './highs';
import connectionLayout from './layouts/connections';
import { pipe, compose } from './utils';

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
  interactive,
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

  if (hiddenFirstRender) {
    features.push(useHiddenFirstRender);
  }

  if (layout) {
    features.push(useLayout(layout === true ? connectionLayout : layout));
  }

  if (autoViewportSize) {
    features.push(useAutoViewportSize());
  }

  const applyFeatures = pipe(...features);
  const Graph = forwardRef(function Graph(props, ref) {
    return createElement(GraphBase, { ...applyFeatures(props), ref });
  });

  const hocs = [];
  if (interactive) {
    hocs.push(withInteraction);
  }
  if (autoBox) {
    hocs.push(withAutoBox);
  }

  return compose(...hocs)(Graph);
};
