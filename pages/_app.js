import React from "react";
import Header from "../components/Header";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
