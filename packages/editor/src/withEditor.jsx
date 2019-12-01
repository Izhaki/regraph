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

  return WrappedComponent => {
    const WithEditor = props => {
      const state = useStore(store);

      const onDragStart = event => dispatch({ type: 'dragStart', event });
      const onDrag = event => dispatch({ type: 'drag', event });
      const onDragEnd = event => dispatch({ type: 'dragEnd', event });

      return (
        <WrappedComponent
          {...props}
          {...state}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onBoxes={onBoxes}
        />
      );
    };

    return WithEditor;
  };
};
