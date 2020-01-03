import { find, remove } from './utils';

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
  const connection = find(connections, '@@draggedConnection');
  const end = srcMeta.type === 'output' ? 'dst' : 'src';
  connection[end] = isValid ? getEnd(dstMeta) : event.getPosition();
};

export const connectionCancel = ({ connections }) => {
  remove(connections, '@@draggedConnection');
};

export const connectionCommit = ({ connections }) => {
  const connection = find(connections, '@@draggedConnection');
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
    const connection = find(connections, meta.id);
    connection.selected = true;
  });
};

export const deselect = ({ connections }, { metas }) => {
  metas.filter(isConnection).forEach(meta => {
    const connection = find(connections, meta.id);
    connection.selected = false;
  });
};

export const deleteConnections = ({ connections }, { payload: ids }) => {
  ids.forEach(id => {
    remove(connections, id);
  });
};
