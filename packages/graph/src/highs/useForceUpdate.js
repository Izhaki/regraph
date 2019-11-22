import { useReducer } from 'react';

export default () => {
  const [, forceUpdate] = useReducer(() => Object.create(null));
  return forceUpdate;
};
