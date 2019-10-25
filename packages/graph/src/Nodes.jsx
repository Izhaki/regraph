import React from 'react';
import PropTypes from 'prop-types';

const Nodes = ({ nodes, boxes, defaults, isHtml }) => (
  <g className="regraph-nodes">
    {nodes.map(node => {
      const { type, ...props } = {
        ...node,
        ...defaults,
        box: boxes[node.id],
        isHtml,
        key: node.id,
      };
      return React.createElement(type, props);
    })}
  </g>
);

Nodes.propTypes = {
  boxes: PropTypes.object.isRequired,
  defaults: PropTypes.object,
  isHtml: PropTypes.bool,
  nodes: PropTypes.array,
};

export default Nodes;
