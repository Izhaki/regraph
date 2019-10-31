import React from 'react';
import PropTypes from 'prop-types';
import useMarkers from './useMarkers';
import { PointPropTypes } from '@regraph/core';

export default WrappedComponent => {
  const Connection = props => {
    const { id, src, dst, strokeWidth } = props;
    const { srcMarker, dstMarker, srcTrim, dstTrim } = useMarkers(
      id,
      src,
      dst,
      strokeWidth
    );

    const padding = {
      src: src.padding || 0,
      dst: dst.padding || 0,
    };

    const srcMarkerId = srcMarker && srcMarker.props.id;
    const dstMarkerId = dstMarker && dstMarker.props.id;

    return (
      <g id={id} className="regraph-connection">
        {srcMarker}
        {dstMarker}
        <WrappedComponent
          {...props}
          markerStart={srcMarkerId ? `url('#${srcMarkerId}')` : null}
          markerEnd={dstMarkerId ? `url('#${dstMarkerId}')` : null}
          srcTrim={srcTrim + padding.src}
          dstTrim={dstTrim + padding.dst}
        />
      </g>
    );
  };

  Connection.getShape = WrappedComponent.getShape;

  Connection.propTypes = {
    dst: PointPropTypes.isRequired,
    id: PropTypes.string.isRequired,
    src: PointPropTypes.isRequired,
    strokeWidth: PropTypes.number,
  };

  return Connection;
};
