import { Fragment } from "react";
import Head from "next/head";
import TransactionDetail from "../../components/Transactions/TransactionDetail/TransactionDetail";

function DetailPage() {
  return (
    <Fragment>
      <Head>
        <title>Details</title>
        <meta
          name="description"
          content="Check details and make a transaction"
        />
      </Head>
      <TransactionDetail />
    </Fragment>
  );
}

export default DetailPage;
