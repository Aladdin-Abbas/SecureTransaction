import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { TransactionContextProvider } from "../store/TransactionContext";
import "../components/TransactionsHistory/paginate.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <TransactionContextProvider>
      <Head>
        <link rel="icon" href="st5.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TransactionContextProvider>
  );
}

export default MyApp;
