import React from 'react';
import Chip from '@regraph/nodes/html/Chip';

const meta = {
  title: 'LFO',
  inputs: [
    { title: 'F', id: 'frequency', type: 'float' },
    { title: 'SHP', id: 'shape', type: 'enum' },
  ],
  outputs: [{ title: 'OUT', id: 'out', type: 'float' }],
};

export default props => <Chip {...meta} {...props} />;
