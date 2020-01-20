import React from 'react';
import PropTypes from 'prop-types';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import { Provider } from 'react-redux';

export default ({ initialState, tool, getEditPolicies }) => {
  const defaultMiddleware = getDefaultMiddleware({
    thunk: {
      extraArgument: getEditPolicies,
    },
  });

  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [...defaultMiddleware, tool(getEditPolicies)],
  });

  const Editor = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  Editor.propTypes = {
    children: PropTypes.node,
  };

  return Editor;
};
