import React from "react";
import styles from "./Help.module.css";
import { NavBarrr } from "../../Navbar/NavBar";

const Help = () => {
  return (
    <div>
      <NavBarrr />{" "}
      <div className={styles.helpContainer}>
        <iframe
          src={`${process.env.REACT_APP_TAWK_CHAT_LINK}`}
          title="Live Chat"
          className={styles.chatFrame}
        ></iframe>
      </div>
    </div>
  );
};

export default Help;
