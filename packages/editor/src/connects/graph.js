import { connect } from 'react-redux';
import { setBoxes } from '../actions';

const mapDispatchToProps = autoBox => dispatch => {
  const handlers = {
    onMouseDown: event => dispatch({ type: 'mouseDown', event }),
    onMouseMove: event => dispatch({ type: 'mouseMove', event }),
    onMouseUp: event => dispatch({ type: 'mouseUp', event }),
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
