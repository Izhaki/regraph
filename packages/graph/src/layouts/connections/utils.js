// When a connection is not connected to a node (like when dragging a new
// connection) it won't have an id
export const endNeedsResolution = end => end.id !== undefined;
