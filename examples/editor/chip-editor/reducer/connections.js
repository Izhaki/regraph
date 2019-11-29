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
  { source, event: { position }, isValid }
) => {
  const [from, to] = source.type === 'output' ? ['src', 'dst'] : ['dst', 'src'];
  const end = getEnd(source);
  connections.push({
    id: '@@draggedConnection',
    [from]: end,
    [to]: isValid ? end : position,
  });
};

export const connectionDrag = (
  { connections },
  { source, target, event: { position }, isValid }
) => {
  const connection = connections.find(idEqual('@@draggedConnection'));
  const end = source.type === 'output' ? 'dst' : 'src';
  connection[end] = isValid ? getEnd(target) : position;
};

export const connectionCancel = state => {
  state.connections = state.connections.filter(
    idDifferent('@@draggedConnection')
  );
};

export const connectionCommit = ({ connections }) => {
  const connection = connections.find(idEqual('@@draggedConnection'));
  connection.id = generateId(connection);
};

export const connectionEnd = (state, { isValid }) => {
  if (isValid) {
    connectionCommit(state);
  } else {
    connectionCancel(state);
  }
};
