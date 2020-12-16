// eslint-disable-next-line import/no-unassigned-import -- styles
import "./styles.scss";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { StrictMode } from "react";
import type { MutableSnapshot } from "recoil";
import { RecoilRoot } from "recoil";
import { Navigation } from "../app";
import type { Product } from "../atoms/products";
import { productList } from "../atoms/products";
import { theme } from "../styled/theme";

const initializeState = (pageProps: Readonly<{
  products?: Product[];
}>) => ({ set }: Readonly<MutableSnapshot>): void => {
  if (pageProps.products) {
    set(productList, pageProps.products);
  }
};

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- next type
const App = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention -- jsx element
  Component,
  router,
  pageProps,
}: Readonly<AppProps>): JSX.Element => (
  <StrictMode>
    <RecoilRoot initializeState={initializeState(pageProps)}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <pre>
          {JSON.stringify(router, null, 2)}
        </pre>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);

export default App;
