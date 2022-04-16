import React from "react";

import styles from "./Controls.module.css";

interface ControlsProps {
  onDeal: React.MouseEventHandler<HTMLButtonElement>;
  onStay: React.MouseEventHandler<HTMLButtonElement>;
}

const Controls: React.FC<ControlsProps> = ({ onDeal, onStay }) => {
  return (
    <div className={styles.container}>
      <button onClick={onDeal}>Hit</button>
      <button onClick={onStay}>Stay</button>
    </div>
  );
};

export default Controls;
