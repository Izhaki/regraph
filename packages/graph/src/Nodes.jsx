import React from 'react';
import PropTypes from 'prop-types';

const Nodes = ({ nodes, boxes, isHtml }) => {
  const getNodeElement = node => {
    const { type, ...props } = {
      ...node,
      box: boxes[node.id],
      isHtml,
      key: node.id,
    };
    return React.createElement(type, props);
  };

  const children = nodes.map(getNodeElement);

  return React.createElement(
    isHtml ? 'div' : 'g',
    { className: 'regraph-nodes' },
    children
  );
};

Nodes.propTypes = {
  boxes: PropTypes.object.isRequired,
  isHtml: PropTypes.bool,
  nodes: PropTypes.array,
};

export default Nodes;
