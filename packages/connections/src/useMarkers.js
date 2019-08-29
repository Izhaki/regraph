import React, { useMemo } from 'react';

export default (id, markerStart, markerEnd) => {
  const markerEndId = `${id}-marker-end`;
  const MarkerEnd = useMemo(
    () => markerEnd && React.cloneElement(markerEnd, { id: markerEndId }),
    [markerEnd, markerEndId]
  );

  const markerStartId = `${id}-marker-start`;
  const MarkerStart = useMemo(
    () => markerStart && React.cloneElement(markerStart, { id: markerStartId }),
    [markerStart, markerStartId]
  );

  return { MarkerStart, MarkerEnd, markerStartId, markerEndId };
};
