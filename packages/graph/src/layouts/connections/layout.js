import { isRect } from '@regraph/geo/rect';
import { mergeConnections } from '@regraph/core';
import resolveAnchors from './resolveAnchors';
import { endNeedsResolution } from './utils';

const allConnections = () => true;

// TODO: core?
const getEndId = end => (end.port ? `${end.id}/${end.port}` : end.id);

const ignore = connection => ({ ...connection, ignore: true });

const layout = (props, needsLayout = allConnections) => {
  const { connections = [], boxes } = props;
  const missingBox = end => !isRect(boxes[getEndId(end)]);
  const getEndsMissingBox = connection =>
    [connection.src, connection.dst]
      .filter(endNeedsResolution)
      .filter(missingBox);

  const allEndsMissingBoxes = {};

  const outConnections = connections.map(connection => {
    if (needsLayout(connection)) {
      const endsMissingBoxes = getEndsMissingBox(connection);
      endsMissingBoxes.forEach(end => {
        allEndsMissingBoxes[getEndId(end)] = end;
      });

      if (endsMissingBoxes.length) {
        return ignore(connection);
      }
      const anchors = resolveAnchors(props, connection);

      // Anchors will be undefined if resolution failed.
      // This can happen, for example, when a source node is dragged over a
      // destination node yielding a connection with negative length.
      if (anchors) {
        const resolvedConnection = mergeConnections(connection, anchors);
        delete resolvedConnection.ignore;
        return resolvedConnection;
      }
      return ignore(connection);
    }
    // Add original connection
    return connection;
  });
  return {
    connections: outConnections,
    endsMissingBoxes: Object.values(allEndsMissingBoxes),
  };
};

layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
