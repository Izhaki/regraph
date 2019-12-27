import { useEffect, useState } from 'react';
import update from './update';

export default update(({ style }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    style: isFirstRender ? { ...style, opacity: 0 } : style,
  };
});
