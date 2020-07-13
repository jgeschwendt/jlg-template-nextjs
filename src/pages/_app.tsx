import './styles.scss';
import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  breakpoints: {
    sm: 568,
    md: 678,
  }
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
