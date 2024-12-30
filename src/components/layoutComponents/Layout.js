import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="main-content-sec">{children}</div>
    </div>
  );
};

export default Layout;
