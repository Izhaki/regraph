import React from 'react';
import PropTypes from 'prop-types';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import { Provider } from 'react-redux';

export default ({ initialState, tool }) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [...getDefaultMiddleware(), tool],
  });

  const Editor = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  Editor.propTypes = {
    children: PropTypes.node,
  };

  return Editor;
};
