import { find, remove } from './utils';

const isNode = item => item.type === 'chip';

export const select = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = find(nodes, meta.id);
    node.selected = true;
  });
};

export const deselect = ({ nodes }, { metas }) => {
  metas.filter(isNode).forEach(meta => {
    const node = find(nodes, meta.id);
    node.selected = false;
  });
};

const isConnectedTo = nodeId => connection =>
  connection.src.id === nodeId || connection.dst.id === nodeId;

export const deleteSelected = ({ nodes, connections, selected }) => {
  selected.filter(isNode).forEach(meta => {
    remove(nodes, meta.id);

    const nodeConnections = connections.filter(isConnectedTo(meta.id));
    nodeConnections.forEach(connection => {
      remove(connections, connection.id);
    });
  });
};
