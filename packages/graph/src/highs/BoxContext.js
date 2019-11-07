import { createContext, useContext } from 'react';

export const BoxContext = createContext({
  requestBox: () => {
    console.warn(
      `Regraph: A request was made to BoxContext, but none was provided.`
    );
  },
});

export const useBoxContext = () => useContext(BoxContext);
