import React from 'react';
import Chip from '@regraph/nodes/html/Chip';

const meta = {
  title: 'FILTER',
  inputs: [
    { title: 'IN', id: 'input', type: 'audio' },
    { title: 'F', id: 'cutoff', type: 'float' },
    { title: 'RES', id: 'resonance', type: 'float' },
  ],
  outputs: [{ title: 'OUT', id: 'out', type: 'audio' }],
};

export default props => <Chip {...meta} {...props} />;
