import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Container } from '@material-ui/core';
import globalStyles from '../src/global.styles';

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
          <Container maxWidth={'md'}>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

export default withStyles(globalStyles)(MyApp);
