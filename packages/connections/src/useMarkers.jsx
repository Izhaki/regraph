import React, { useMemo } from 'react';
import { toSvgViewBox } from '@regraph/geo/rect';

const isArrowhead = marker => marker.type.getMarkerProps !== undefined;

const getArrowheadMarker = arrowhead => {
  const {
    width,
    height,
    viewBox,
    anchor,
    trim,
  } = arrowhead.type.getMarkerProps(arrowhead.props);

  return (
    <marker
      markerWidth={width}
      markerHeight={height}
      viewBox={toSvgViewBox(viewBox)}
      refX={anchor.x}
      refY={anchor.y}
      data-trim={trim}
      markerUnits="strokeWidth"
      orient="auto">
      {arrowhead}
    </marker>
  );
};

const getMarker = markerOrHead =>
  isArrowhead(markerOrHead) ? getArrowheadMarker(markerOrHead) : markerOrHead;

const adjustTrimToWidth = (trim, strokeWidth) => {
  if (trim !== 0 && !strokeWidth) {
    console.warn(
      `Regraph: A marker may not render correctly as no 'strokeWidth' property was provided to the connection.`
    );
  }
  return trim * (strokeWidth || 1);
};

const useMarker = (markerOrHead, id, strokeWidth) =>
  useMemo(() => {
    if (markerOrHead) {
      const marker = getMarker(markerOrHead);
      const trim = marker.props['data-trim'] || 0;
      return {
        trim: adjustTrimToWidth(trim, strokeWidth),
        marker: React.cloneElement(marker, { id }),
      };
    }
    return {};
  }, [id, markerOrHead, strokeWidth]);

export default (id, src, dst, strokeWidth) => {
  const { marker: srcMarker, trim: srcTrim } = useMarker(
    src.marker,
    `${id}-marker-start`,
    strokeWidth
  );
  const { marker: dstMarker, trim: dstTrim } = useMarker(
    dst.marker,
    `${id}-marker-end`,
    strokeWidth
  );

  return { srcMarker, dstMarker, srcTrim, dstTrim };
};
