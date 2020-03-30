import React from 'react';
import PropTypes from 'prop-types';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducer';
import toolRouter from './toolRouter';
import { layouter, nodeDefaults, connectionDefaults } from './middlewares';
import { init } from './actions';

export default ({
  initialState,
  tools,
  getEditPolicies,
  layout,
  defaults = {},
}) => {
  const defaultMiddleware = getDefaultMiddleware({
    thunk: {
      extraArgument: getEditPolicies,
    },
    // We disable these as they choke even a modern MacBook.
    // We should enable in Test mode only.
    serializableCheck: false,
    immutableCheck: false,
  });

  const middleware = [...defaultMiddleware, toolRouter(tools, getEditPolicies)];

  if (defaults.node) {
    middleware.push(nodeDefaults(defaults.node));
  }

  if (defaults.connection) {
    middleware.push(connectionDefaults(defaults.connection));
  }

  if (layout) {
    middleware.push(layouter(layout));
  }

  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware,
  });
  store.dispatch(init());

  const Editor = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  Editor.propTypes = {
    children: PropTypes.node,
  };

  return Editor;
};
