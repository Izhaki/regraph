import React from 'react';
import PropTypes from 'prop-types';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducer';
import toolRouter from './toolRouter';
import {
  layouter,
  nodeDefaults,
  connectionDefaults,
  loomer,
} from './middlewares';
import { init } from './actions';

const isDefined = x => x !== undefined;

export default ({
  initialState,
  tools,
  getEditPolicies,
  looms,
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

  const middleware = [
    ...defaultMiddleware,
    toolRouter(tools, getEditPolicies),
    defaults.node && nodeDefaults(defaults.node),
    defaults.connection && connectionDefaults(defaults.connection),
    // Below are post (reducers) middleware so order is inverted (looms will have before layout)
    layout && layouter(layout),
    looms && loomer,
  ].filter(isDefined);

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
