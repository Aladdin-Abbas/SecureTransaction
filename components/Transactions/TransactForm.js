import { Fragment, useRef, useState, useEffect, useContext } from "react";
import Feedback from "../UI/Feedback";
import TransactionContext from "../../store/TransactionContext";
import axios from "axios";
import classes from "./TransactForm.module.css";

const TransactForm = props => {
  const [senderName, setSenderName] = useState("Jone");
  const [requestState, setRequestState] = useState();
  const [errMsg, setErrMsg] = useState();

  const ctx = useContext(TransactionContext);

  let option = null;
  let formContainerClass = `${classes["form-container"]}`;
  let formClass = `${classes.form} `;
  if (props.data) {
    option = props.data;
    formContainerClass = `${classes["form-container"]} ${classes["detail-from-container"]}`;
    formClass = `${classes.form} ${classes["detail-form"]} `;
  }

  const amountRef = useRef(0);

  const receiverRef = useRef("Vilhelmina");

  const namesArr = option
    ? props.customersData.filter(el => el.name !== option.name)
    : props.customersData.filter(el => el.name !== senderName);

  const [receiverName, setReceiverName] = useState("Vilhelmina");

  // useEffect(() => {
  //   let timer;
  //   if (requestState === "success" || requestState === "fail") {
  //     timer = () => {
  //       setTimeout(() => {
  //         setRequestState(null);
  //       }, 3000);
  //     };
  //     timer();
  //   }

  //   return clearTimeout(timer);
  // }, [requestState]);

  useEffect(() => {
    let timer;
    if (requestState === "success" || requestState === "fail") {
      timer = () => {
        setTimeout(() => {
          setRequestState(null);
        }, 1000);
      };
      timer();
    }

    return clearTimeout(timer);
  }, [requestState]);

  const senderSelectorHandler = e => {
    setSenderName(e.target.value);
  };

  const receiverSelectorHandler = e => {
    setReceiverName(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (amountRef.current.value <= 0 || !amountRef.current.value) {
      return;
    }

    const sender = props.selectedName ? props.selectedName : senderName;
    let receiver =
      sender === receiverName ? receiverRef.current.value : receiverName;

    try {
      setRequestState("pending");

      const updatedData = {
        senderName: sender,
        receiverName: receiver,
        amount: amountRef.current.value,
      };
      await axios.post("/api/transact", updatedData);

      setRequestState("success");

      if (!option) {
        props.dataChangeHandler(updatedData);
      }
      if (option) {
        ctx.updateSenderBalance(updatedData.amount);
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded

        setRequestState("fail");
        setErrMsg(error.response.data.message);
        return;
      } else if (error.request) {
        // The request was made but no response was received

        setRequestState("fail");
        return;
      } else {
        // Something happened in setting up the request that triggered an Error

        setRequestState("fail");
        return;
      }
    }
  };

  let feedback, title, msg;
  if (requestState === "pending") {
    feedback = "pending";
    title = "Processing...";
    msg = "Your transaction is being processed";
  }
  if (requestState === "success") {
    feedback = "success";
    title = "Success";
    msg = "Your transaction is successful";
  }
  if (requestState === "fail") {
    feedback = "fail";
    title = "Your transaction is declined";
    msg = errMsg || "Something went wrong";
  }

  return (
    <Fragment>
      <div className={formContainerClass}>
        <h2>Make Transaction</h2>
        <form className={formClass} onSubmit={submitHandler}>
          <div>
            <label htmlFor="sender">From</label>
            <select
              name="sender"
              id="sender"
              onChange={senderSelectorHandler}
              // ref={senderRef}
            >
              {option ? (
                <option key={option._id}>{option.name}</option>
              ) : (
                props.customersData.map(el => (
                  <option key={el._id}>{el.name}</option>
                ))
              )}
            </select>
            <label htmlFor="receiver">To</label>
            <select
              name="receiver"
              id="receiver"
              onChange={receiverSelectorHandler}
              value={receiverName}
              ref={receiverRef}
            >
              {namesArr.map(el => (
                <option key={el._id}>{el.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input name="amount" id="amount" type="number" ref={amountRef} />
            <button type="submit">Transact</button>
          </div>
        </form>
      </div>
      {feedback && <Feedback feedback={feedback} title={title} msg={msg} />}
    </Fragment>
  );
};

export default TransactForm;
