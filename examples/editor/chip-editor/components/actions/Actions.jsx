import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DeleteSelected from './DeleteSelected';
import Undo from './Undo';
import Redo from './Redo';

const useStyles = makeStyles(theme => ({
  actions: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Actions = () => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <div className={classes.actions}>
        <DeleteSelected />
        <Undo />
        <Redo />
      </div>
    </>
  );
};

export default Actions;
