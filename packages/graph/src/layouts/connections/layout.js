import { isPoint } from '@regraph/geo/point';
import { isRect } from '@regraph/geo/rect';
import { mergeConnections } from '../../utils';
import resolveAnchors from './resolveAnchors';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

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
      // Add resolved connections
      connections.push(mergeConnections(connection, updates));
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
