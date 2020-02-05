import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteSelected from './DeleteSelected';
import Undo from './Undo';
import Redo from './Redo';
import NewNode from './NewNode';

const useStyles = makeStyles(theme => ({
  actions: {
    padding: 0,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const Actions = () => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Toolbar className={classes.actions}>
        <DeleteSelected />
        <Undo />
        <Redo />
        <div className={classes.grow} />
        <NewNode />
      </Toolbar>
    </>
  );
};

export default Actions;
