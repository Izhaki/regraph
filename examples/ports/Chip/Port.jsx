import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Port.style';

const useStyles = makeStyles(styles);

export default ({ title, isInput, id, disabled, connected, type }) => {
  const classes = useStyles({
    isInput,
    disabled: disabled && !connected,
    connected,
    type,
  });

  return (
    <span id={id} data-target-type="port" className={classes.port}>
      <span className={classes.icon} />
      <span className={classes.label}>{title}</span>
    </span>
  );
};
