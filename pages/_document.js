import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="pt">
        <Head>
          <meta charSet="uft-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#1976D2" />

          {/**
          TODO: change static resources from CDN
          */}
          <link rel="shortcut icon" href="/static/images/favicon32.png" type="image/x-icon" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="/static/css/nprogress.min.css" />
          <link rel="stylesheet" href="/static/css/vs.min.css" />
        </Head>
        <body
          style={{
            font: '16px Muli',
            color: '#222',
            margin: '0px auto',
            fontWeight: '300',
            lineHeight: '1.5em',
            backgroundColor: '#F7F9FC',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
