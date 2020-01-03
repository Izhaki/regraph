import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useKeyboardListener } from 'actionsack';
import { connectDeleteAction } from '@regraph/editor';

const DeleteSelected = ({ selectionEmpty, deleteSelected }) => {
  useKeyboardListener('Backspace', deleteSelected);
  return (
    <IconButton
      onClick={deleteSelected}
      disabled={selectionEmpty}
      size="small"
      aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

DeleteSelected.propTypes = {
  deleteSelected: PropTypes.func,
  selectionEmpty: PropTypes.bool,
};

export default connectDeleteAction(DeleteSelected);
