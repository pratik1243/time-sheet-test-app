import React, { useState } from "react";
import LogTimeModal from "./LogTimeModal";
import TimeGridTable from "./TimeGridTable";

const HomePage = () => {
  const [logTimeModal, setLogTimeModal] = useState(false);

  const onCloseModal = () => {
    setLogTimeModal(false);
  };

  return (
    <div>
      <button onClick={() => setLogTimeModal(true)}>Log Time</button>
      <LogTimeModal open={logTimeModal} closeModal={onCloseModal} />
      <TimeGridTable />
    </div>
  );
};

export default HomePage;
