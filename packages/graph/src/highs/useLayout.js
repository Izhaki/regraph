import { useMemo } from 'react';

export default layout => props =>
  useMemo(
    () => layout(props),
    layout.deps(props) // eslint-disable-line react-hooks/exhaustive-deps
  );
