import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';
const foreignObjectStyle = {
  // foreignObject otherwise becomes the target of drag events
  pointerEvents: 'none',
};

const GraphBase = React.forwardRef(function GraphBase(props, ref) {
  const { nodes, connections, boxes, width, height, nodeLayer = 'svg' } = props;

  const style = {
    ...props.style,
    width,
    height: 'auto',
    maxWidth: '100%', // So it doesn't overflow on mobiles
  };

  const hasSvgNodes = nodes && nodeLayer === 'svg';
  const hasHtmlNodes = nodes && nodeLayer === 'html';

  const transform = nodeLayer === 'html' ? null : antialiasingShift;

  return (
    <div style={style} ref={ref}>
      <svg
        transform={transform}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet">
        {connections && <Connections connections={connections} />}
        {hasSvgNodes && <Nodes nodes={nodes} boxes={boxes} />}
        {hasHtmlNodes && (
          <foreignObject
            x={0}
            y={0}
            width={width}
            height={height}
            style={foreignObjectStyle}>
            <Nodes nodes={nodes} boxes={boxes} isHtml />
          </foreignObject>
        )}
      </svg>
    </div>
  );
});

GraphBase.propTypes = {
  boxes: PropTypes.object,
  connections: PropTypes.array,
  height: PropTypes.number.isRequired,
  nodeLayer: PropTypes.oneOf(['svg', 'html']),
  nodes: PropTypes.array,
  style: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default GraphBase;
