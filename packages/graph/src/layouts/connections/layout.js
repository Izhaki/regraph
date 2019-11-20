import { isPoint } from '@regraph/geo/point';
import { isRect } from '@regraph/geo/rect';
import { mergeConnections } from '../../utils';
import resolveAnchors from './resolveAnchors';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);
const isResolved = connection => !needsResolution(connection);

const layoutConnections = (props, boxContext) => {
  const missingBox = end => !isPoint(end) && !isRect(props.boxes[end.id]);
  const getEndsMissingBox = connection =>
    [connection.src, connection.dst].filter(missingBox);
  const requestBox = ({ id, port }) => {
    boxContext.requestBox({ id, port });
  };

  return props.connections.reduce((connections, connection) => {
    const endsMissingBoxes = getEndsMissingBox(connection);

    if (endsMissingBoxes.length) {
      endsMissingBoxes.forEach(requestBox);
      // Don't add the connection to the accumulator - it won't be rendered
    } else if (needsResolution(connection)) {
      const updates = resolveAnchors(props, connection);

      // Resolution may fail (like when there is no intersection because a source node
      // is dragged over a destination node). In such case we don't push the connection -
      // meaning it won't be rendered.
      if (isResolved(updates)) {
        // Add resolved connections
        connections.push(mergeConnections(connection, updates));
      }
    } else {
      // Add original connection
      connections.push(connection);
    }

    return connections;
  }, []);
};

const layout = (props, boxContext) => ({
  ...props,
  connections: layoutConnections(props, boxContext),
});
layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
