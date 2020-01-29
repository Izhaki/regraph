import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import { useKeyboardListener } from 'actionsack';
import { connectUndoAction } from '@regraph/editor';

const Undo = ({ canUndo, undo }) => {
  useKeyboardListener('⌘-z', undo);
  return (
    <IconButton
      onClick={undo}
      disabled={!canUndo}
      size="small"
      aria-label="delete">
      <UndoIcon />
    </IconButton>
  );
};

Undo.propTypes = {
  canUndo: PropTypes.bool,
  undo: PropTypes.func,
};

export default connectUndoAction(Undo);
