import { Fragment } from "react";
import Link from "next/link";

import classes from "./Navigation.module.css";
// import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const SideNav = props => {
  return (
    <div className={classes["side-nav"]}>
      <div>
        <Link href="/transaction">
          <a onClick={props.onConfirm}>
            <img src="/icons8-transaction-64.png" alt="" />
            <p>Transact</p>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/history">
          <a onClick={props.onConfirm}>
            <img
              src="/icons8-transaction-list-64.png"
              alt=""
              className={classes.imgTwo}
            />
            <p>Transaction History</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

const Navigation = () => {
  // const router = useRouter()
  // router.push()

  const [showSideNav, setShowSideNav] = useState(false);

  const onConfirm = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <Fragment>
      {showSideNav &&
        createPortal(
          <Backdrop onConfirm={onConfirm} />,
          document.getElementById("backdrop-root")
        )}
      {showSideNav &&
        createPortal(
          <SideNav onConfirm={onConfirm} />,
          document.getElementById("overlay-root")
        )}
      {/* {showSideNav && <SideNav />} */}
      <header className={classes.header}>
        <div className={classes["side-nav-toggle"]} onClick={onConfirm}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Link href="/" passHref>
          <div
            className={classes["logo-container"]}
            onClick={() => setShowSideNav(false)}
          >
            <div className={classes["img-container"]}>
              <img src="/st5.jpg" alt="Secure Transaction" />
            </div>
            <p className={classes.text}>Secure Transaction</p>
          </div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/transaction">Transact</Link>
            </li>
            <li>
              <Link href="/history">Transaction History</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Navigation;
