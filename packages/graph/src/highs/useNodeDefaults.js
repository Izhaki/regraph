import { useMemo } from 'react';
import update from './update';

export default defaults =>
  update(({ nodes }) => ({
    nodes: useMemo(() => nodes.map(node => ({ ...defaults, ...node })), [
      nodes,
    ]),
  }));
