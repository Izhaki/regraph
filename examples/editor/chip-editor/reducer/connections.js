const idEqual = id => item => item.id === id;
const idDifferent = id => item => item.id !== id;

const getEnd = ({ id, port, type }) => ({
  id,
  port: port.id,
  anchor: type === 'input' ? 'left' : 'right',
});

const getEndId = end => `${end.id}/${end.port}`;
const generateId = ({ src, dst }) => `${getEndId(src)}->${getEndId(dst)}`;

export const connectionStart = (
  { connections },
  { srcMeta, event, isValid }
) => {
  const [from, to] =
    srcMeta.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
  const end = getEnd(srcMeta);
  connections.push({
    id: '@@draggedConnection',
    [from]: end,
    [to]: isValid ? end : event.getPosition(),
  });
};

export const connectionDrag = (
  { connections },
  { srcMeta, dstMeta, event, isValid }
) => {
  const connection = connections.find(idEqual('@@draggedConnection'));
  const end = srcMeta.type === 'output' ? 'dst' : 'src';
  connection[end] = isValid ? getEnd(dstMeta) : event.getPosition();
};

export const connectionCancel = state => {
  state.connections = state.connections.filter(
    idDifferent('@@draggedConnection')
  );
};

export const connectionCommit = ({ connections }) => {
  const connection = connections.find(idEqual('@@draggedConnection'));
  connection.id = generateId(connection);
  connection.overlay = true;
};

export const connectionEnd = (state, { isValid }) => {
  if (isValid) {
    connectionCommit(state);
  } else {
    connectionCancel(state);
  }
};

const isConnection = item => item.type === 'connection';

export const select = ({ connections }, { metas }) => {
  metas.filter(isConnection).forEach(meta => {
    const connection = connections.find(idEqual(meta.id));
    connection.selected = true;
  });
};

export const deselect = ({ connections }, { metas }) => {
  metas.filter(isConnection).forEach(meta => {
    const connection = connections.find(idEqual(meta.id));
    connection.selected = false;
  });
};

export const deleteSelected = ({ connections, selected }) => {
  selected.filter(isConnection).forEach(meta => {
    connections.splice(connections.findIndex(idEqual(meta.id)), 1);
  });
};
