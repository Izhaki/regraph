import { useReducer, useLayoutEffect } from 'react';

export default store => {
  const [, forceUpdate] = useReducer(() => Object.create(null));

  // With useEffect we will only get notified after the first render. We don't want this.
  // So we use useLayoutEffect instead.
  // Recall that store.subscribe returns unsubscribe, which will be called on unMount
  useLayoutEffect(() => store.subscribe(forceUpdate), [store]);

  return store.getState();
};
