import { useMemo } from 'react';

export default (marker, strokeWidth) => {
  return useMemo(() => {
    if (marker && marker.type.getMarkerProps) {
      const { trim } = marker.type.getMarkerProps(marker.props);
      const trimScaled = trim * (strokeWidth || 1);
      if (trimScaled !== 0 && !strokeWidth) {
        console.warn(
          `Regraph: a ${marker.type.name} marker may not render correctly as no 'strokeWidth' property was provided to the connection.`
        );
      }
      return trimScaled;
    }
    return 0;
  }, [marker, strokeWidth]);
};
