import { Fragment } from "react";
import classes from "./NotFound.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className={classes.container}>
        <Image src="/ErrorPage404-02.jpg" layout="fill" alt="Not found" />
      </div>
      <div className={classes.fixed}>
        <h1>Oops!</h1>
        <p>
          We Can&apos;t seem to find the <br />
          page you&apos;re looking for{" "}
        </p>

        <button onClick={() => router.push("/")}>Head Back!</button>
      </div>
    </Fragment>
  );
};

export default NotFound;
