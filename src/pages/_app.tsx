import './styles.scss';
import { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Navigation } from '../app';

const theme = {
  breakpoints: {
    /* eslint-disable sort-keys */
    sm: 568,
    md: 678,
    /* eslint-enable sort-keys */
  },
};

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
