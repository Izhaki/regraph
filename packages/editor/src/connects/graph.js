import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onDragStart: event => dispatch({ type: 'dragStart', event }),
  onDrag: event => dispatch({ type: 'drag', event }),
  onDragEnd: event => dispatch({ type: 'dragEnd', event }),
  onClick: event => dispatch({ type: 'click', event }),
  onBoxes: boxes => dispatch({ type: 'setBoxes', boxes }),
});

const mapStateToProps = ({ nodes, boxes, connections }) => ({
  nodes,
  boxes,
  connections,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
