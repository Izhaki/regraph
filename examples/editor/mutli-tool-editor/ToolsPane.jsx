import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import {
  multiTool,
  connectTools,
  moveTool,
  creationTool,
  connectionTool,
} from '@regraph/editor';

export const tools = [
  {
    tool: multiTool(moveTool, creationTool),
    icon: <RadioButtonUncheckedIcon />,
  },
  { tool: connectionTool, icon: <TrendingFlatIcon /> },
];

const ToolsPane = ({ currentTool, setCurrentTool }) => {
  return (
    <Toolbar disableGutters style={{ flexDirection: 'column' }}>
      {tools.map(({ icon, tool }, index) => (
        <Button
          key={tool.name}
          variant={index === currentTool ? 'contained' : 'text'}
          disableElevation
          onClick={() => setCurrentTool(index)}
          style={{
            minWidth: 0,
            padding: 12,
            borderRadius: 0,
          }}>
          {icon}
        </Button>
      ))}
    </Toolbar>
  );
};

export default connectTools(ToolsPane);
