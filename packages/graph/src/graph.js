import { createElement } from 'react';
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
  const Graph = props => createElement(GraphBase, applyFeatures(props));

  return autoBox ? withAutoBox(Graph) : Graph;
};
