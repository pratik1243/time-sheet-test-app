import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
