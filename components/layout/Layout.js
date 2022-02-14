import { Fragment } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = props => {
  return (
    <Fragment>
      <Navigation />
      <Fragment>{props.children}</Fragment>
      <Footer />
    </Fragment>
  );
};

export default Layout;
