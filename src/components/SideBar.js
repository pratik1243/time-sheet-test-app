import React from "react";
import clockSidebarLogo from "../assets/images/clock-sidebar-icon.svg";
import settingSidebarLogo from "../assets/images/setings-sidebar-icon.svg";
import groupSidebarLogo from "../assets/images/group-sidebar-icon.svg";
import fileSidebarLogo from "../assets/images/file-sidebar-icon.svg";

const SideBar = () => {
  const sideNavItems = [
    {
      logo: clockSidebarLogo
    },

    {
      logo: fileSidebarLogo,
    },
    {
      logo: groupSidebarLogo,
    },
    {
      logo: settingSidebarLogo,
    },
  ];

  return (
    <div className="side-bar-section">
      {sideNavItems.map((ele, index) => {
        return (
          <div key={index} className='side-menu-btn-sec'>
            <img src={ele.logo} className='side-menu-icon' />
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
