import { removeConnections } from '../../../../examples/editor/chip-editor/reducer/connections';
import { removeNodes } from '../../../../examples/editor/chip-editor/reducer/nodes';
import { deselect } from '../../../../examples/editor/chip-editor/reducer/selected';

const isNode = item => item.type === 'node';
const isConnection = item => item.type === 'connection';
const getId = item => item.id;

const getNodeConnectionsIds = ({ connections, nodeIds, connectionIds }) => {
  const notSelected = connection => !connectionIds.includes(getId(connection));
  const isSelectedNodeConnection = connection =>
    nodeIds.some(
      nodeId => connection.src.id === nodeId || connection.dst.id === nodeId
    );
  return connections.filter(
    connection =>
      notSelected(connection) && isSelectedNodeConnection(connection)
  );
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

  // Providing empty `metas` means connections and nodes won't remove the
  // selected flag from the (already deleted) items.
  // `all` will clear the `selected` array.
  dispatch(deselect({ metas: [], all: true }));
};
