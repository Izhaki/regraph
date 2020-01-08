import { connect } from 'react-redux';
import { setBoxes } from '../actions';

const mapDispatchToProps = autoBox => dispatch => {
  const handlers = {
    onDragStart: event => dispatch({ type: 'dragStart', event }),
    onDrag: event => dispatch({ type: 'drag', event }),
    onDragEnd: event => dispatch({ type: 'dragEnd', event }),
    onClick: event => dispatch({ type: 'click', event }),
  };
  if (autoBox) {
    handlers.onBoxes = boxes => dispatch(setBoxes({ boxes }));
  }
  return handlers;
};

const mapStateToProps = ({ nodes, boxes, connections }) => ({
  nodes,
  boxes,
  connections,
});

export default ({ autoBox } = {}) =>
  connect(
    mapStateToProps,
    mapDispatchToProps(autoBox)
  );