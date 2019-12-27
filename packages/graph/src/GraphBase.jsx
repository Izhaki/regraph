import React from 'react';
import PropTypes from 'prop-types';
import Nodes from './Nodes';
import Connections from './Connections';

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';

const GraphBase = React.forwardRef(function GraphBase(props, ref) {
  const {
    nodes,
    connections,
    boxes,
    width,
    height,
    nodeLayer = 'svg',
    style: propStyle,
    ...others
  } = props;

  const style = {
    ...propStyle,
    width,
    height,
    maxWidth: '100%', // So it doesn't overflow on mobiles
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
    overflow: 'scroll',
    display: 'grid',
  };

  const hasSvgNodes = nodes && nodeLayer === 'svg';
  const hasHtmlNodes = nodes && nodeLayer === 'html';

  const transform = nodeLayer === 'html' ? null : antialiasingShift;

  return (
    <div {...others} style={style} ref={ref}>
      <svg
        transform={transform}
        width={width}
        height={height}
        style={{ gridColumn: 1, gridRow: 1 }}>
        {connections && <Connections connections={connections} />}
        {hasSvgNodes && <Nodes nodes={nodes} boxes={boxes} />}
      </svg>
      {hasHtmlNodes && (
        <Nodes
          nodes={nodes}
          boxes={boxes}
          width={width}
          height={height}
          isHtml
        />
      )}
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
