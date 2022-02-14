import { Fragment } from "react";
import Head from "next/head";
import TransactionsHistory from "../components/TransactionsHistory/TransactionsHistory";
import dbConnect from "../middleware/dbConnect";
import Transaction from "../models/Transaction";

const History = props => {
  return (
    <Fragment>
      <Head>
        <title>Transactions History</title>
        <meta name="description" content="view transactions history" />
      </Head>

      <TransactionsHistory transactions={JSON.parse(props.transactions)} />
    </Fragment>
  );
};

export default History;

export async function getServerSideProps() {
  let data;
  try {
    await dbConnect();
    data = await Transaction.find().sort("-date").limit(15);

    if (!data) {
      return {
        props: {
          transactions: "err",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        transactions: "err",
      },
    };
  }

  return {
    props: {
      transactions: JSON.stringify(data),
    },
  };
}
