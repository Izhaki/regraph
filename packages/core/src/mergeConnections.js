const mergeConnections = (a, b) => ({
  ...a,
  ...b,
  src: { ...a.src, ...b.src },
  dst: { ...a.dst, ...b.dst },
});

export default mergeConnections;
