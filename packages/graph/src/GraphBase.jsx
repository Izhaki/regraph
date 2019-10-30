import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';

const GraphBase = props => {
  const { nodes, connections, boxes, width, height, nodeLayer = 'svg' } = props;

  const style = {
    ...props.style,
    position: 'relative',
    width,
    height,
  };

  const hasSvgNodes = nodes && nodeLayer === 'svg';
  const hasHtmlNodes = nodes && nodeLayer === 'html';

  return (
    <div style={style} data-regraph-graph>
      <svg style={style} transform={antialiasingShift}>
        {connections && <Connections connections={connections} />}
        {hasSvgNodes && <Nodes nodes={nodes} boxes={boxes} />}
      </svg>
      {hasHtmlNodes && <Nodes nodes={nodes} boxes={boxes} isHtml />}
    </div>
  );
};

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
