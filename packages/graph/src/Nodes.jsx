import React from 'react';
import PropTypes from 'prop-types';

const Nodes = ({ nodes, boxes, renderNode, graphProps, isHtml }) => (
  <>
    {nodes.map(node => {
      const box = boxes[node.id];
      return renderNode({ ...node, box, isHtml }, graphProps);
    })}
  </>
);

Nodes.propTypes = {
  boxes: PropTypes.object.isRequired,
  graphProps: PropTypes.object,
  isHtml: PropTypes.bool,
  nodes: PropTypes.array,
  renderNode: PropTypes.func.isRequired,
};

export default Nodes;
