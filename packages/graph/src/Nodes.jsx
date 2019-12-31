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
    style: {
      width,
      height,
      // The nodes element is really a layer, so we don't want it to block pointer
      // events for layers below (like connections). Elements that should receive
      // pointer events will override this.
      pointerEvents: 'none',
      gridColumn: 1,
      gridRow: 1,
    },
  };

  return React.createElement(isHtml ? 'div' : 'g', props, children);
};

Nodes.propTypes = {
  boxes: PropTypes.object.isRequired,
  height: PropTypes.number,
  isHtml: PropTypes.bool,
  nodes: PropTypes.array,
  width: PropTypes.number,
};

export default Nodes;
