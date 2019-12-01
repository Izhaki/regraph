import React from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes } from '@regraph/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Chip.style';
import Port from './Port';

const useStyles = makeStyles(styles);

const Chip = ({ id, title, box: { x, y }, inputs, outputs, ...others }) => {
  const mainOut = outputs.find(port => port.title === 'OUT');
  const type = mainOut ? mainOut.type : 'other';
  const classes = useStyles({ type });
  return (
    <span
      id={id}
      style={{ position: 'absolute', left: x, top: y }}
      className={classes.wrapper}
      {...others}>
      <span className={classes.header}>{title}</span>
      <span className={classes.body}>
        <span className={classes.inputs}>
          {inputs &&
            inputs.map(props => (
              <Port
                key={props.id}
                {...props}
                id={`${id}/${props.id}`}
                isInput
              />
            ))}
        </span>
        <span className={classes.outputs}>
          {outputs &&
            outputs.map(props => (
              <Port key={props.id} {...props} id={`${id}/${props.id}`} />
            ))}
        </span>
      </span>
    </span>
  );
};

Chip.propTypes = {
  box: PointPropTypes.isRequired,
  id: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  outputs: PropTypes.array,
  title: PropTypes.string,
};

export default Chip;
