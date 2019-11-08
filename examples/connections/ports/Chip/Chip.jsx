import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Chip.style';

import Port from './Port';

const useStyles = makeStyles(styles);

export default ({ title, inputs, outputs, id }) => {
  const mainOut = outputs.find(port => port.title === 'OUT');
  const type = mainOut ? mainOut.type : 'other';
  const classes = useStyles({ type });
  return (
    <span id={id} data-target-type="node" className={classes.wrapper}>
      <span className={classes.header}>{title}</span>
      <span className={classes.body}>
        {inputs && (
          <span className={classes.inputs}>
            {inputs.map(props => (
              <Port key={props.id} {...props} isInput />
            ))}
          </span>
        )}
        {outputs && (
          <span className={classes.outputs}>
            {outputs.map(props => (
              <Port key={props.id} {...props} />
            ))}
          </span>
        )}
      </span>
    </span>
  );
};
