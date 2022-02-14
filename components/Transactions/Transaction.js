import { Fragment, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import TransactionContext from "../../store/TransactionContext";
import TransactForm from "./TransactForm";
import classes from "./Transaction.module.css";
import Loader from "../UI/Loader";

const Transaction = props => {
  const ctx = useContext(TransactionContext);
  const router = useRouter();

  const [customersData, setCustomersData] = useState(props.customersData);

  let isValid = true;
  if (props.customersData === "err") {
    isValid = false;
  }

  const dataChangeHandler = updatedData => {
    let senderIndex = customersData.findIndex(
      el => el.name === updatedData.senderName
    );
    let receiverIndex = customersData.findIndex(
      el => el.name === updatedData.receiverName
    );
    const myData = [...customersData];
    myData[senderIndex].balance -= updatedData.amount;
    myData[receiverIndex].balance += updatedData.amount * 1;
    setCustomersData(myData);
  };

  const myClass = `${classes.container} ${classes.fail}`;

  // const detailsHandler = id => {
  //   ctx.storeTransactionData(props.customersData);
  //   router.push(`/transaction/${id}`);
  // };

  const detailsHandler = el => {
    ctx.storeTransactionData(props.customersData);
    ctx.storeSenderData(el);
    router.push(`/transaction/${el._id}`, `/transaction/${el._id}`, {
      shallow: true,
    });
    // router.push(`/transaction/${el.id}`);
  };

  return (
    <Fragment>
      {isValid && !customersData && <Loader />}
      {!isValid && (
        <div className={myClass}>
          <div className={classes.content}>
            <h1>Something went wrong, Please try again later!</h1>
          </div>
        </div>
      )}
      {isValid && (
        <div className={classes.container}>
          <div className={classes.content}>
            <ul>
              <li className={classes["list-head"]}>
                <p>Name</p>
                <p>Email</p>
                <p>Balance (USD)</p>
                <p>Details</p>
              </li>
              {customersData.map(el => (
                <li key={el._id}>
                  <p>{el.name}</p>
                  <p>{el.email}</p>
                  <p>{el.balance}</p>
                  {/* <p onClick={() => detailsHandler(el._id)}>Details</p> */}
                  <p onClick={() => detailsHandler(el)}>Details</p>
                </li>
              ))}
            </ul>
            <TransactForm
              customersData={customersData}
              dataChangeHandler={dataChangeHandler}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Transaction;
