import update from './update';
import { pipe } from '../utils';

const getEndId = end => end.id || `(${end.x},${end.y})`;

const getGroupId = ({ src, dst }) =>
  [src, dst]
    .map(getEndId)
    .sort()
    .join('<->');

const getGroups = connections =>
  connections.reduce((groups, connection) => {
    const groupId = getGroupId(connection);
    groups[groupId] = groups[groupId] || [];
    groups[groupId].push(connection);
    return groups;
  }, {});

const hasMultiConnections = group => group.length > 1;
const keepMultiGroups = groups =>
  Object.values(groups).filter(hasMultiConnections);

const getTopBend = (connections, gap) => {
  const height = (connections.length - 1) * gap;
  // We substract half the height to have the loom centred centred.
  // That is, instead of 0..40, we get -20..20.
  return height - height / 2;
};

const getUpdates = gap => groups =>
  groups.reduce((updates, connections) => {
    const topBend = getTopBend(connections, gap);
    const firstConnectionSrcId = getEndId(connections[0].src);
    const isInverted = connection =>
      getEndId(connection.src) !== firstConnectionSrcId;
    const getBend = index => topBend - gap * index;
    connections.forEach((connection, index) => {
      updates[connection.id] = {
        ...connection,
        bend: isInverted(connection) ? -getBend(index) : getBend(index),
      };
    });
    return updates;
  }, {});

const applyUpdates = connections => updates =>
  connections.map(connection => updates[connection.id] || connection);

export default (gap = 12) =>
  update(({ connections }) => ({
    connections: pipe(
      getGroups,
      keepMultiGroups,
      getUpdates(gap),
      applyUpdates(connections)
    )(connections),
  }));
