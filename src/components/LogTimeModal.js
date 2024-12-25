import React from "react";
import InputField from "./fieldComponents/InputField";

const LogTimeModal = ({ open, closeModal }) => {
  return (
    <div className={`modal-backdrop ${open ? 'show-modal' : ''}`}>
      <div className="log-time-modal">
        <div className="input-sec full-grid">
          <h2 className="modal-head">Log Time</h2>
        </div>
        <div className="input-sec full-grid">
          <InputField placeholder={"Search issues"} />
        </div>
        <div className="input-sec">
          <InputField placeholder={"06/Sep/24"} />
        </div>
        <div className="input-sec">
          <InputField placeholder={"0h"} />
        </div>
        <div className="input-sec full-grid">
          <InputField placeholder={"Description"} />
        </div>
        <div className="modal-btn-sec full-grid">
          <button className="secondary-btn" onClick={closeModal}>Cancel</button>
          <button className="primary-btn log-time-modal-btn" onClick={closeModal}>Log Time</button>
        </div>
      </div>
    </div>
  );
};

export default LogTimeModal;
