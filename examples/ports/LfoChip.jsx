import React from 'react';
import { withPosition } from '@regraph/graph';
import Chip from './Chip/Chip';
import createNode from './createNode';

const meta = {
  title: 'LFO',
  inputs: [
    { title: 'F', id: 'frequency', type: 'float' },
    { title: 'SHP', id: 'shape', type: 'enum' },
  ],
  outputs: [{ title: 'OUT', id: 'out', type: 'float' }],
};

export default withPosition(({ id }) => (
  <Chip {...createNode(meta, id, meta.title)} />
));
