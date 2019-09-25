import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import 'prismjs/themes/prism-solarizedlight.css';

const Code = ({ code, language = 'jsx' }) => (
  <Highlight
    {...defaultProps}
    code={code}
    language={language}
    theme={undefined}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
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
);

export default Code;
