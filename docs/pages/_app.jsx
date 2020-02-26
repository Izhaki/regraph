import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'docs/src/theme';
import globalStyles from 'docs/src/global.styles';
import Drawer from 'docs/src/components/Drawer';

import 'prismjs/themes/prism-solarizedlight.css';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head key={'regraph'}>
          <title>Regraph</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Drawer>
            <Component {...pageProps} />
          </Drawer>
        </ThemeProvider>
      </>
    );
  }
}

export default withStyles(globalStyles)(MyApp);
