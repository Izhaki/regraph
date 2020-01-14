import { forwardRef, createElement } from 'react';
import GraphBase from './GraphBase';
import {
  useNodeDefaults,
  useNormaliseConnections,
  useConnectionDefaults,
  useAutoConnectionId,
  useLoomer,
  useBoxExtractor,
  useHideFirstRender,
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
  hideFirstRender,
  layout,
  autoViewportSize,
  interactive,
  connector,
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

  if (hideFirstRender || autoBox) {
    features.push(useHideFirstRender);
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
  if (connector) {
    hocs.push(connector);
  }
  if (interactive) {
    const eventMapper = interactive === true ? undefined : interactive;
    hocs.push(withInteraction(eventMapper));
  }
  if (autoBox) {
    hocs.push(withAutoBox);
  }

  return compose(...hocs)(Graph);
};
