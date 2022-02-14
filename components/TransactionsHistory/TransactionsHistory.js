import React, { Fragment, useEffect, useState } from "react";
import Loader from "../UI/Loader";
import ReactPaginate from "react-paginate";
import classes from "./TransactionHistory.module.css";

function Items({ currentItems }) {
  return (
    <Fragment>
      {currentItems && (
        <div className={classes.container}>
          <div className={classes.content}>
            <span className={classes.outer}>
              <h1 className={classes.inner}>Transactions</h1>
            </span>

            <ul>
              <li className={classes["list-head"]} id="myId">
                <p>Sender</p>
                <p>Receiver</p>
                <p>Amount (USD)</p>
                <p>Date</p>
              </li>
              {currentItems.map(el => (
                <li key={el._id}>
                  <p>{el.sender}</p>
                  <p>{el.receiver}</p>
                  <p>{el.amount}</p>
                  <p>{new Date(el.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
}

const TransactionsHistory = props => {
  const items = props.transactions;
  let isValid = true;
  if (props.transactions === "err") {
    isValid = false;
  }
  const itemsPerPage = 10;

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // if (items) {
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    // }
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      {isValid && !currentItems && <Loader />}
      {!isValid && (
        <div className={`${classes.container} ${classes.fail}`}>
          <div className={classes.content}>
            <h1>Something went wrong, Please try again later!</h1>
          </div>
        </div>
      )}
      {isValid && <Items currentItems={currentItems} />}
      {isValid && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          className={classes.paginate}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="previous-item"
          previousLinkClassName="previous-link"
          nextClassName="next-item"
          nextLinkClassName="next-link"
          breakClassName="break-item"
          breakLinkClassName="break-link"
          marginPagesDisplayed={2}
          activeClassName="active"
          activeLinkClassName="myActive"
        />
      )}
    </>
  );
};

export default TransactionsHistory;
