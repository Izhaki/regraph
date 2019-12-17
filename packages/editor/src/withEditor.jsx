import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import useStore from './useStore';

export default ({ initialState, reducer, tool }) => {
  const enhancer = applyMiddleware(tool);

  const store = createStore(reducer, initialState, enhancer);
  const { dispatch } = store;

  const onBoxes = boxes => {
    store.dispatch({ type: 'setBoxes', boxes });
  };

  const onDragStart = event => dispatch({ type: 'dragStart', event });
  const onDrag = event => dispatch({ type: 'drag', event });
  const onDragEnd = event => dispatch({ type: 'dragEnd', event });
  const onClick = event => dispatch({ type: 'click', event });

  return WrappedComponent => {
    const WithEditor = props => {
      const state = useStore(store);

      return (
        <WrappedComponent
          {...props}
          {...state}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onClick={onClick}
          onBoxes={onBoxes}
        />
      );
    };

    return WithEditor;
  };
};
