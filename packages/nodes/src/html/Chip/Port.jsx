import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Port.style';

const useStyles = makeStyles(styles);

const Port = ({ title, isInput, id, disabled, connected, type }) => {
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

Port.propTypes = {
  connected: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isInput: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Port;
