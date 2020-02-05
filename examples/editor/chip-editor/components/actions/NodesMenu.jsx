import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@regraph/nodes/html/Chip';
import * as chips from '../../chips';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    justifyContent: 'center',
  },
}));

export default ({ open, anchorRef, onSelection, onClose }) => {
  const classes = useStyles();

  const id = open ? 'node-list-list' : undefined;

  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorRef.current}
      onClose={onClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {Object.entries(chips).map(([name, props]) => (
        <MenuItem
          button
          key={name}
          className={classes.item}
          onClick={() => onSelection(props)}>
          <Chip {...props} id={`${name}-chip`} />
        </MenuItem>
      ))}
    </Menu>
  );
};
