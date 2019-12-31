import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteSelected = ({ selectionEmpty, deleteSelected }) => (
  <IconButton
    onClick={deleteSelected}
    disabled={selectionEmpty}
    size="small"
    aria-label="delete">
    <DeleteIcon />
  </IconButton>
);

DeleteSelected.propTypes = {
  deleteSelected: PropTypes.func,
  selectionEmpty: PropTypes.bool,
};

export default DeleteSelected;
