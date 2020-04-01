import { forwardRef, createElement } from 'react';
import { pipe, compose } from '@regraph/core';
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
  withBoxer,
  withInteraction,
} from './highs';
import connectionLayout from './layouts/connections';

export default ({
  defaults = {},
  normalizeConnections,
  autoConnectionId,
  looms,
  extractBoxesFromNodes,
  boxer,
  hideFirstRender,
  layout,
  autoViewportSize,
  interactive,
  connector,
}) => {
  const features = [];

  if (defaults.node) {
    features.push(useNodeDefaults(defaults.node));
  }

  if (normalizeConnections) {
    features.push(useNormaliseConnections);
  }

  if (defaults.connection) {
    features.push(useConnectionDefaults(defaults.connection));
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

  if (hideFirstRender || boxer) {
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
  if (boxer) {
    hocs.push(withBoxer);
  }

  return compose(...hocs)(Graph);
};
