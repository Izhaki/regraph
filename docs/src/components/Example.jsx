import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import 'prismjs/themes/prism-solarizedlight.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import CodeIcon from '@material-ui/icons/Code';
import GithubIcon from './GithubIcon';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

const borderRadius = 6;
const border = '1px solid #d1d5da';
const connectionColor = '#888';

const systemFonts = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

const useStyles = makeStyles(theme => ({
  graphWrapper: {
    // So it resizes to its content
    display: 'inline-block',
    // So it is centred
    margin: [[0, 'auto']],
    // So it and its content shrink on small screens.
    // 96% so it meets the straight part of the rounded code box
    maxWidth: '96%',
    // So we can absolute-position the code button
    position: 'relative',
    border: '1px solid #d1d5da',
    borderRadius: [[borderRadius, borderRadius, 0, 0]],
    backgroundColor: 'white',
    fontFamily: systemFonts,

    '& .regraph-nodes rect, .regraph-nodes ellipse': {
      fill: '#FFD86E',
      stroke: '#EDBA39',
    },
    '& .regraph-connection': {
      stroke: connectionColor,
      fill: connectionColor,
    },
  },
  codeWrapper: {
    '&[class*="language-"]': {
      marginTop: 0,
      marginBottom: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
  },
  codeContainer: {
    position: 'relative',
    top: -1,
    borderRadius,
    border,
    backgroundColor: '#f7f1d5',
  },
  codeButton: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: `translate(-50%, 50%)`,
    backgroundColor: '#f7f1d5',
    '&:hover': {
      backgroundColor: '#fdf6e3',
    },
    border,
    zIndex: 1,
  },
  codeActions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: 6,
  },
}));

const Code = ({ code, output, sourceOpen, path, language = 'jsx' }) => {
  const classes = useStyles();
  const [showSource, setShowSource] = React.useState(sourceOpen);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={classes.graphWrapper}>
          {output}
          <IconButton
            className={classes.codeButton}
            size="small"
            onClick={() => setShowSource(!showSource)}>
            <CodeIcon />
          </IconButton>
        </span>
        <Collapse
          in={showSource}
          classes={{ container: classes.codeContainer }}>
          <div className={classes.codeActions}>
            <Tooltip title={'Source on GitHub'} placement="bottom">
              <IconButton
                target="_blank"
                size="small"
                href={`https://github.com/Izhaki/regraph/tree/master/${path}`}
                aria-label={'Source on GitHub'}>
                <GithubIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Divider />
          <Highlight
            {...defaultProps}
            code={code}
            language={language}
            theme={undefined}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={clsx(classes.codeWrapper, className)}
                style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </Collapse>
      </div>
    </>
  );
};

export default Code;
