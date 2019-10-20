import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */

const renderConnections = props => (
  <Connections connections={props.connections} connection={props.connection} />
);

const renderNodes = (renderNode, props, isHtml = false) => (
  <Nodes
    nodes={props.nodes}
    boxes={props.boxes}
    renderNode={renderNode}
    graphProps={props}
    isHtml={isHtml}
  />
);

/* eslint-enable react/prop-types */

// Translating by half a pixel results in uniform anti-aliasing
const antialiasingShift = 'translate(0.5 0.5)';

const GraphBase = props => {
  const { renderSvgNode, renderHtmlNode, connection, width, height } = props;

  const style = {
    position: 'relative',
    width,
    height,
  };

  return (
    <div style={style} data-regraph-graph>
      <svg style={style} transform={antialiasingShift}>
        {connection && renderConnections(props)}
        {renderSvgNode && renderNodes(renderSvgNode, props)}
      </svg>
      {renderHtmlNode && renderNodes(renderHtmlNode, props, true)}
    </div>
  );
};

/* eslint-disable react/no-unused-prop-types */

GraphBase.propTypes = {
  boxes: PropTypes.object,
  connection: PropTypes.element,
  connections: PropTypes.array,
  height: PropTypes.number.isRequired,
  nodes: PropTypes.array,
  renderHtmlNode: PropTypes.func,
  renderSvgNode: PropTypes.func,
  width: PropTypes.number.isRequired,
};

export default GraphBase;
