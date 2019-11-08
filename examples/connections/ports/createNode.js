const stampId = (nodeId, ports) =>
  ports.map(({ id, ...props }) => ({
    ...props,
    id: `${nodeId}/${id}`,
  }));

export default (meta, id, title) => ({
  id,
  title,
  inputs: stampId(id, meta.inputs),
  outputs: stampId(id, meta.outputs),
});
