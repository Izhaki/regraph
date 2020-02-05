import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NodesMenu from './NodesMenu';
import { useKeyboardListener } from 'actionsack';
import { connectNewNodeAction } from '@regraph/editor';

const NewNode = ({ newNode }) => {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useKeyboardListener('+', handleOpen);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNodeSelection = node => {
    handleClose();
    newNode(node);
  };

  return (
    <div>
      <IconButton
        ref={buttonRef}
        onClick={handleOpen}
        size="small"
        aria-label="New Node">
        <AddIcon />
      </IconButton>
      <NodesMenu
        open={open}
        anchorRef={buttonRef}
        onSelection={handleNodeSelection}
        onClose={handleClose}
      />
    </div>
  );
};

export default connectNewNodeAction(NewNode);
