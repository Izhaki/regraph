import { connect } from 'react-redux';
import { updateBoxes } from '../actions';

const mapDispatchToProps = boxer => dispatch => {
  const handlers = {
    onMouseDown: event => dispatch({ type: 'mouseDown', event }),
    onMouseMove: event => dispatch({ type: 'mouseMove', event }),
    onMouseUp: event => dispatch({ type: 'mouseUp', event }),
  };
  if (boxer) {
    handlers.onBoxes = boxes => dispatch(updateBoxes(boxes));
  }
  return handlers;
};

const mapStateToProps = ({ nodes, boxes, connections, boxRequests }) => ({
  nodes,
  boxes,
  connections,
  ...(boxRequests.length && { boxRequests }),
});

export default ({ boxer } = {}) =>
  connect(
    mapStateToProps,
    mapDispatchToProps(boxer)
  );
