import { Fragment } from "react";
import Head from "next/head";
import Transaction from "../../components/Transactions/Transaction";
import Customer from "../../models/Customer";
import dbConnect from "../../middleware/dbConnect";

function TransactionPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Transact</title>
        <meta name="description" content="Make a transaction" />
      </Head>

      <Transaction customersData={JSON.parse(props.customersData)} />
    </Fragment>
  );
}

export default TransactionPage;

export async function getServerSideProps() {
  let data;

  try {
    await dbConnect();

    data = await Customer.find();
    if (!data) {
      return {
        props: {
          err: "err",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        err: "err",
      },
    };
  }

  return {
    props: {
      customersData: JSON.stringify(data),
    },
  };
}
