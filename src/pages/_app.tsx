import './styles.scss';
import { Product } from '@prisma/client';
import { AppProps } from 'next/app';
import React from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Navigation } from '../app';
import { productList } from '../atoms/products';
import { theme } from '../styled/theme';

const initializeState = (pageProps: {
  products?: Product[];
}) => ({ set }: MutableSnapshot) => {
  if (pageProps.products) {
    set(productList, pageProps.products);
  }
};

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot initializeState={initializeState(pageProps)}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
