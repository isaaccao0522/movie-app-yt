import React, { Children } from "react";
import PropTypes from "prop-types";
//// Others
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
