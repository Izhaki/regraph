import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import graphConnect from './graphConnect';

export default ({ initialState, reducer, tool }) => {
  const enhancer = applyMiddleware(tool);

  const store = createStore(reducer, initialState, enhancer);

  return WrappedComponent => {
    const ConnectedComponent = graphConnect(WrappedComponent);

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
