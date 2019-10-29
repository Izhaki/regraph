import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */

const renderConnections = props => (
  <Connections connections={props.connections} connection={props.connection} />
);

const renderNodes = (props, isHtml = false) => (
  <Nodes
    nodes={props.nodes}
    boxes={props.boxes}
    defaults={props.node}
    isHtml={isHtml}
  />
);

/* eslint-enable react/prop-types */

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';

const GraphBase = props => {
  const { nodes, connections, width, height, nodeLayer = 'svg' } = props;

  const style = {
    ...props.style,
    position: 'relative',
    width,
    height,
  };

  return (
    <div style={style} data-regraph-graph>
      <svg style={style} transform={antialiasingShift}>
        {connections && renderConnections(props)}
        {nodes && nodeLayer === 'svg' && renderNodes(props)}
      </svg>
      {nodes && nodeLayer === 'html' && renderNodes(props, true)}
    </div>
  );
};

/* eslint-disable react/no-unused-prop-types */

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
