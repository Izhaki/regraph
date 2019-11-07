// Adapted from https://github.com/CharlesStover/use-force-update

import { useRef, useState } from 'react';

// Creates empty object, but one that doesn't inherent from Object.prototype
const newValue = () => Object.create(null);

export default () => {
  const setState = useState(newValue())[1];

  const forceUpdate = useRef(() => {
    setState(newValue());
  }).current;

  return forceUpdate;
};
