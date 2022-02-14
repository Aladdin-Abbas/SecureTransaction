import { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import TransactionContext from "../../../store/TransactionContext";
import TransactForm from "../TransactForm";
import Loader from "../../UI/Loader";
import classes from "./TransactionDetail.module.css";

const TransactionDetail = () => {
  const ctx = useContext(TransactionContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(ctx);
  }, [ctx]);

  return (
    <Fragment>
      {!data && <Loader />}
      {data && data.senderData && (
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <div>
                <p>Name:</p>
                <p>{data.senderData.name}</p>
              </div>

              <div>
                <p>Email:</p>
                <p>{data.senderData.email}</p>
              </div>

              <div>
                <p>Balance:</p>
                <p>{data.senderData.balance}</p>
              </div>
            </div>
            <TransactForm
              customersData={data.transactionData}
              data={data.senderData}
              selectedName={data.senderData.name}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TransactionDetail;
