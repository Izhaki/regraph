import React from 'react';
import { withPosition } from '@regraph/graph';
import Chip from './Chip/Chip';
import createNode from './createNode';

const meta = {
  title: 'FILTER',
  inputs: [
    { title: 'IN', id: 'input', type: 'audio' },
    { title: 'F', id: 'cutoff', type: 'float' },
    { title: 'RES', id: 'resonance', type: 'float' },
  ],
  outputs: [{ title: 'OUT', id: 'out', type: 'audio' }],
};

export default withPosition(({ id }) => (
  <Chip {...createNode(meta, id, meta.title)} />
));
