import { useReducer, useEffect } from 'react';

export default store => {
  const [, forceUpdate] = useReducer(() => Object.create(null));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return store.getState();
};
