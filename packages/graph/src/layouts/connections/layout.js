import { isPoint } from '@regraph/geo/point';
import { isRect } from '@regraph/geo/rect';
import { mergeConnections } from '../../utils'; // TODO: move to connections?
import resolveAnchors from './resolveAnchors';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

// TODO: core?
const getEndId = end => (end.port ? `${end.id}/${end.port}` : end.id);

const ignore = connection => ({ ...connection, ignore: true });

const layout = props => {
  const { connections = [], boxes } = props;
  const missingBox = end => !isRect(boxes[getEndId(end)]);
  const getEndsMissingBox = connection =>
    [connection.src, connection.dst].filter(missingBox);

  const allEndsMissingBoxes = {};

  const outConnections = connections.map(connection => {
    if (needsResolution(connection)) {
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
        return resolvedConnection;
      }
      return ignore(connection);
    }
    // Add original connection
    return connection;
  });
  return {
    ...props,
    connections: outConnections,
    endsMissingBoxes: allEndsMissingBoxes,
  };
};

layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
