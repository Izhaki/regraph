import React from 'react';
import PropTypes from 'prop-types';

const Nodes = ({ nodes, boxes, width, height, isHtml }) => {
  const getNodeElement = node => {
    const { type, ...props } = {
      ...node,
      box: boxes[node.id],
      key: node.id,
    };
    return React.createElement(type, props);
  };

  const children = nodes.map(getNodeElement);

  const props = {
    className: 'regraph-nodes',
    style: { width, height, position: 'relative', gridColumn: 1, gridRow: 1 },
  };

  return React.createElement(isHtml ? 'div' : 'g', props, children);
};

Nodes.propTypes = {
  boxes: PropTypes.object.isRequired,
  isHtml: PropTypes.bool,
  nodes: PropTypes.array,
};

export default Nodes;
