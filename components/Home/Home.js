import classes from "./Home.module.css";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <section className={classes.container}>
      <div className={classes.el1}></div>
      <div className={classes.el2}></div>
      <div className={classes.el3}></div>

      <div className={classes.el4}></div>
      <div className={classes.el5}>
        <span className={classes.outer}>
          <h1 className={classes.inner}>Secure Transaction</h1>
        </span>

        <p className={classes.shadow}>
          Your transaction is 100% secure with us, What are you waiting for!
        </p>
        <div className={classes.el6}>
          <button onClick={() => router.push("/transaction")}>
            Make Transaction
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
