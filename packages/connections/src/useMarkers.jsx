import React, { useMemo } from 'react';

const useMarker = (marker, id) =>
  useMemo(() => marker && React.cloneElement(marker, { id }), [id, marker]);

export default (id, src, dst) => {
  const srcMarker = useMarker(src.marker, `${id}-marker-start`);
  const dstMarker = useMarker(dst.marker, `${id}-marker-end`);

  return { srcMarker, dstMarker };
};
