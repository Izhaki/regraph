import React, { useMemo } from 'react';

export default (id, markerStart, markerEnd) => {
  const markerStartId = `${id}-marker-start`;
  const MarkerStart = useMemo(
    () =>
      markerStart &&
      React.cloneElement(markerStart, { id: markerStartId, flip: true }),
    [markerStart, markerStartId]
  );

  const markerEndId = `${id}-marker-end`;
  const MarkerEnd = useMemo(
    () => markerEnd && React.cloneElement(markerEnd, { id: markerEndId }),
    [markerEnd, markerEndId]
  );

  return { MarkerStart, MarkerEnd, markerStartId, markerEndId };
};
