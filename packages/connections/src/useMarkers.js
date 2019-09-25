import React, { useMemo } from 'react';

const useTrim = (marker, strokeWidth) => {
  // If the marker was produced by `withMarker`, we'll have `getTrim` on it.
  // Since markers are provided as elements, we use `marker.type`.
  const getTrim = marker && marker.type.getTrim;
  return useMemo(() => (getTrim ? getTrim(marker.props, strokeWidth) : 0), [
    getTrim,
    marker.props,
    strokeWidth,
  ]);
};

export default (id, markerStart, markerEnd, strokeWidth) => {
  const startTrim = useTrim(markerStart, strokeWidth);
  const MarkerStart = useMemo(
    () =>
      markerStart &&
      React.cloneElement(markerStart, { id: `${id}-marker-start`, flip: true }),
    [id, markerStart]
  );

  const endTrim = useTrim(markerEnd, strokeWidth);
  const MarkerEnd = useMemo(
    () =>
      markerEnd && React.cloneElement(markerEnd, { id: `${id}-marker-end` }),
    [id, markerEnd]
  );

  return { MarkerStart, MarkerEnd, startTrim, endTrim };
};
