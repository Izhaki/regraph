import React from 'react';
import Nodes from './Nodes';
import Connections from './Connections';
import PropTypes from 'prop-types';

const Graph = props => {
  const {
    nodes,
    connections,
    boxes,
    renderSvgNode,
    renderHtmlNode,
    renderConnection,
    width,
    height,
  } = props;

  const style = {
    position: 'relative',
    width,
    height,
  };

  return (
    <div style={style} data-regraph-graph>
      <svg style={{ position: 'relative', width, height }}>
        <Connections
          connections={connections}
          renderConnection={renderConnection}
          graphProps={props}
        />
        {renderSvgNode && (
          <Nodes
            nodes={nodes}
            boxes={boxes}
            renderNode={renderSvgNode}
            graphProps={props}
          />
        )}
      </svg>
      {renderHtmlNode && (
        <Nodes
          nodes={nodes}
          boxes={boxes}
          renderNode={renderHtmlNode}
          graphProps={props}
          isHtml
        />
      )}
    </div>
  );
};

Graph.propTypes = {
  boxes: PropTypes.object.isRequired,
  connections: PropTypes.array,
  height: PropTypes.number.isRequired,
  nodes: PropTypes.array,
  renderConnection: PropTypes.func,
  renderHtmlNode: PropTypes.func,
  renderSvgNode: PropTypes.func,
  width: PropTypes.number.isRequired,
};

export default Graph;
