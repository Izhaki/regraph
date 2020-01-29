import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import RedoIcon from '@material-ui/icons/Redo';
import { useKeyboardListener } from 'actionsack';
import { connectRedoAction } from '@regraph/editor';

const Redo = ({ canRedo, redo }) => {
  useKeyboardListener('command-x', () => canRedo && redo());
  return (
    <IconButton
      onClick={redo}
      disabled={!canRedo}
      size="small"
      aria-label="redo">
      <RedoIcon />
    </IconButton>
  );
};

Redo.propTypes = {
  canRedo: PropTypes.bool,
  redo: PropTypes.func,
};

export default connectRedoAction(Redo);
