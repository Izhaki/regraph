import { deselect, removeConnections, removeNodes } from '../slices/actions';

const isNode = item => item.type === 'node';
const isConnection = item => item.type === 'connection';
const getId = item => item.id;

const getNodeConnectionsIds = ({ connections, nodeIds, connectionIds }) => {
  const notSelected = connection => !connectionIds.includes(getId(connection));
  const isSelectedNodeConnection = connection =>
    nodeIds.some(
      nodeId => connection.src.id === nodeId || connection.dst.id === nodeId
    );
  return connections
    .filter(
      connection =>
        notSelected(connection) && isSelectedNodeConnection(connection)
    )
    .map(getId);
};

export default () => (dispatch, getState) => {
  const { selected, connections } = getState();
  const nodeIds = selected.filter(isNode).map(getId);
  const connectionIds = selected.filter(isConnection).map(getId);
  const nodeConnectionsIds = getNodeConnectionsIds({
    connections,
    nodeIds,
    connectionIds,
  });

  dispatch(removeNodes({ ids: nodeIds }));
  dispatch(
    removeConnections({
      ids: [...connectionIds, ...nodeConnectionsIds],
    })
  );

  // Providing empty `targets` means connections and nodes won't remove the
  // selected flag from the (already deleted) items.
  // `all` will clear the `selected` array.
  dispatch(deselect({ targets: [], all: true }));
};
