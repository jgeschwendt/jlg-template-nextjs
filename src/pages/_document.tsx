import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

type RenderPageResult = { head?: Array<JSX.Element | null>; html: string };

export default class Main extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const renderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> => (
        renderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })
      );

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}
