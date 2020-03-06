import { isPoint } from '@regraph/geo/point';
import { isRect } from '@regraph/geo/rect';
import { mergeConnections } from '../../utils'; // TODO: move to connections?
import resolveAnchors from './resolveAnchors';

const needsResolution = ({ src, dst }) => !isPoint(src) || !isPoint(dst);

// TODO: core?
const getEndId = end => (end.port ? `${end.id}/${end.port}` : end.id);

const layout = props => {
  const { connections = [], boxes } = props;
  const missingBox = end => !isPoint(end) && !isRect(boxes[getEndId(end)]);
  const getEndsMissingBox = connection =>
    [connection.src, connection.dst].filter(missingBox);

  const updates = connections.reduce(
    (acc, connection) => {
      const endsMissingBoxes = getEndsMissingBox(connection);
      endsMissingBoxes.forEach(end => {
        acc.endsMissingBoxes[getEndId(end)] = end;
      });

      if (endsMissingBoxes.length) {
        // Don't push
      } else if (needsResolution(connection)) {
        const anchors = resolveAnchors(props, connection);

        // anchors will be undefined if resolution failed.
        // This can happen, for example, when there is no intersection because a source node
        // is dragged over a destination node. In such case we don't push the connection -
        // meaning it won't be rendered.
        if (anchors) {
          // Add resolved connections
          acc.connections.push(mergeConnections(connection, anchors));
        }
      } else {
        // Add original connection
        acc.connections.push(connection);
      }

      return acc;
    },
    { connections: [], endsMissingBoxes: {} }
  );
  return {
    ...props,
    ...updates,
  };
};

layout.deps = ({ boxes, connections }) => [boxes, connections];

export default layout;
