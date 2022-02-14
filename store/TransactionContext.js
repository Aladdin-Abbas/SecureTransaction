import { createContext, useEffect, useState } from "react";

const TransactionContext = createContext({
  transactionData: null,
  senderData: null,

  storeTransactionData: transactionData => {},
  storeSenderData: senderData => {},
  updateSenderBalance: amount => {},
});

export function TransactionContextProvider(props) {
  const [sotredData, setStoredData] = useState(null);
  const [storedSender, setStoredSender] = useState(null);

  const storeTransactionData = transactionData =>
    setStoredData(transactionData);

  const storeSenderData = senderData => setStoredSender(senderData);

  const updateSenderBalance = amount => {
    if (context.senderData) {
      let myData = { ...context.senderData };
      myData.balance -= amount;
      setStoredSender(myData);
    }
  };
  const context = {
    transactionData: sotredData,
    senderData: storedSender,

    storeTransactionData,
    storeSenderData,
    updateSenderBalance,
  };

  useEffect(() => {
    if (context.senderData) {
      localStorage.setItem("oldData", JSON.stringify(context));
    } else {
      let myData = localStorage.getItem("oldData");
      if (myData) {
        myData = JSON.parse(myData);

        setStoredData(myData.transactionData);
        setStoredSender(myData.senderData);
      }
    }
  }, [context.senderData]);

  return (
    <TransactionContext.Provider value={context}>
      {props.children}
    </TransactionContext.Provider>
  );
}

export default TransactionContext;
