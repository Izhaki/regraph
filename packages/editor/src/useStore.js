import { useReducer, useMemo } from 'react';

export default store => {
  const [, forceUpdate] = useReducer(() => Object.create(null));

  useMemo(() => {
    store.subscribe(() => {
      forceUpdate();
    });
  }, [store]);

  return store.getState();
};
