import React from "react";
import InputField from "./fieldComponents/InputField";
import calendarIcon from "../assets/images/calendar-icon.png";
import timeIcon from "../assets/images/time-icon.png";
import searchIcon from "../assets/images/search-icon-2.svg";
import descriptionIcon from "../assets/images/description-icon.svg";

const LogTimeModal = ({ open, closeModal }) => {
  return (
    <div className={`backdrop ${open ? "show" : ""}`}>
      <div className="log-time-modal">
        <div className="input-sec full-grid">
          <h2 className="modal-head">Log Time</h2>
        </div>
        <div className="input-sec full-grid">
          <InputField placeholder={"Search issues"} endIcon={searchIcon} />
        </div>
        <div className="input-sec">
          <InputField placeholder={"06/Sep/24"} endIcon={calendarIcon} />
        </div>
        <div className="input-sec">
          <InputField placeholder={"0h"} endIcon={timeIcon} />
        </div>
        <div className="input-sec full-grid">
          <InputField placeholder={"Description"} endIcon={descriptionIcon} />
        </div>
        <div className="modal-btn-sec full-grid">
          <button className="secondary-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="primary-btn log-time-modal-btn"
            onClick={closeModal}
          >
            Log Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogTimeModal;
