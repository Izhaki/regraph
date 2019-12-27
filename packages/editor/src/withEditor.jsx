import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Provider, connect } from 'react-redux';

export default ({ initialState, reducer, tool }) => {
  const enhancer = applyMiddleware(tool);

  const store = createStore(reducer, initialState, enhancer);

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

  return WrappedComponent => {
    const ConnectedComponent = connect(
      mapStateToProps,
      mapDispatchToProps
    )(WrappedComponent);

    const WithEditor = props => {
      return (
        <Provider store={store}>
          <ConnectedComponent {...props} />
        </Provider>
      );
    };

    return WithEditor;
  };
};
