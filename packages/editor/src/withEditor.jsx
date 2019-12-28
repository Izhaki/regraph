import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';

export default ({ initialState, reducer, tool }) => {
  const enhancer = applyMiddleware(tool);

  const store = createStore(reducer, initialState, enhancer);

  return WrappedComponent => {
    const WithEditor = props => {
      return (
        <Provider store={store}>
          <WrappedComponent {...props} />
        </Provider>
      );
    };

    return WithEditor;
  };
};
