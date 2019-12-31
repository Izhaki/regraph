import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

export default ({ initialState, reducer, tool }) => {
  const enhancer = applyMiddleware(thunk, tool);

  const store = createStore(reducer, initialState, enhancer);

  const Editor = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  Editor.propTypes = {
    children: PropTypes.node,
  };

  return Editor;
};
