import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    //정식 favicon 변환 사이트에서 아이콘 변환해야함 이상한 사이트에서 하면 안됨.
    return (
      <Html>
        <Head>
          <title>Auton-Iot Admin Center</title>
          <link rel="shortcut icon" href="/logo.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600&family=Saira+Stencil+One&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument