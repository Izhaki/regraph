import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';

const GraphBase = props => {
  const {
    forwardedRef,
    nodes,
    connections,
    boxes,
    width,
    height,
    nodeLayer = 'svg',
  } = props;

  const style = {
    ...props.style,
    position: 'relative',
    // When querying the position of HTML nodes, FireFox accounts for border whilst other browsers
    // don't. This messes up auto-boxing. So force no border on the graph component
    border: 'none',
    width,
    height,
  };

  const hasSvgNodes = nodes && nodeLayer === 'svg';
  const hasHtmlNodes = nodes && nodeLayer === 'html';

  return (
    <div style={style} ref={forwardedRef}>
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
  forwardedRef: PropTypes.object,
  height: PropTypes.number.isRequired,
  nodeLayer: PropTypes.oneOf(['svg', 'html']),
  nodes: PropTypes.array,
  style: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default GraphBase;
