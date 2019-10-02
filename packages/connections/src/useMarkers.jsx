import React, { useMemo } from 'react';
import Marker from './Marker';
import useTrim from './useTrim';

const useMarker = (marker, id, isStart = false) =>
  useMemo(() => {
    if (marker) {
      const markerProps = marker.type.getMarkerProps({
        ...marker.props,
        flip: isStart,
      });

      return (
        <Marker
          id={`${id}-marker-${isStart ? 'start' : 'end'}`}
          {...markerProps}>
          {React.cloneElement(marker, {
            flip: isStart,
          })}
        </Marker>
      );
    }
    return undefined;
  }, [id, isStart, marker]);

export default (id, markerStart, markerEnd, strokeWidth) => {
  const startTrim = useTrim(markerStart, strokeWidth);
  const MarkerStart = useMarker(markerStart, id, true);

  const endTrim = useTrim(markerEnd, strokeWidth);
  const MarkerEnd = useMarker(markerEnd, id);

  return { MarkerStart, MarkerEnd, startTrim, endTrim };
};
