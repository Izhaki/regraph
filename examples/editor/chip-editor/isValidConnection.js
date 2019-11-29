export default (src, dst) =>
  src &&
  dst &&
  src.type !== dst.type &&
  src.port &&
  dst.port &&
  src.id !== dst.id &&
  src.port.type === dst.port.type;
