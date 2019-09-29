import React, { useMemo } from 'react';

const useTrim = (marker, strokeWidth) => {
  return useMemo(() => {
    // If the marker was produced by `withMarker`, we'll have `getTrim` on it.
    // Since markers are provided as elements, we use `marker.type`.
    if (marker && marker.type.getTrim) {
      return marker.type.getTrim(marker.props, strokeWidth);
    }
    return 0;
  }, [marker, strokeWidth]);
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
