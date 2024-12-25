import React from "react";
import jiraNavLogo from "../assets/images/jira-logo.svg";
import menuBtnLogo from "../assets/images/menu-btn.svg";
import notificationLogo from "../assets/images/notification-icon.svg";
import questionLogo from "../assets/images/question-circle-icon.svg";
import profileLogo from "../assets/images/profile-icon.svg";
import settingLogo from "../assets/images/settings-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";


const NavBar = () => {
  return (
    <div className="nav-bar-section">
      <div className="nav-left-section">
        <div className="nav-logo-sec">
          <button className="menu-btn">
            <img src={menuBtnLogo} alt="menu-btn" className="menu-btn-icon" />
          </button>

          <img src={jiraNavLogo} alt="nav-logo" />
        </div>

        <div className="nav-menu-btn-sec">
          <ul className="menu-btn-list">
            <li className="menu-btn-sec">
              <a>Your work</a>
            </li>
            <li className="menu-btn-sec">
              <a>Projects <div className="dropdown-icon"></div></a>
              
            </li>
            <li className="menu-btn-sec">
              <a>Filters <div className="dropdown-icon"></div></a>
            </li>
            <li className="menu-btn-sec">
              <a>Dashboards <div className="dropdown-icon"></div></a>
            </li>
            <li className="menu-btn-sec">
              <a>People</a>
            </li>
            <li className="menu-btn-sec">
              <a>Apps <div className="dropdown-icon"></div></a>
            </li>
            <li>
              <button className="primary-btn create-btn">Create</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-right-section">
        <div className="search-input-sec">
          <img src={searchIcon} alt="menu-btn" className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="nav-right-menu-sec">
          <button className="menu-btn">
            <img src={notificationLogo} alt="menu-btn" />
          </button>
        
          <button className="menu-btn">
            <img src={questionLogo} alt="menu-btn" />
          </button>
          <button className="menu-btn">
            <img src={settingLogo} alt="menu-btn" />
          </button>
          <div className="profile-btn-sec">
            <img src={profileLogo} alt="menu-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
