import Head from "next/head";
import Home from "../components/Home/Home";
import { Fragment } from "react";

function Main() {
  return (
    <Fragment>
      <Head>
        <title>Secure Transaction</title>
        <meta
          name="description"
          content="make a secure transaction in a simple steps"
        />
      </Head>
      <Home />
    </Fragment>
  );
}

export default Main;
