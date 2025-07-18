import React from "react";
import styles from "./PaymentHistory.module.css";

export const TableRow = ({ invoice, plan, amount, status, date }) => {
  const badgeClass =
    status === "Pending" ? styles.badgePending : styles.badgePaid;

  return (
    <>
      <div className={styles.cell}>
        <img
          src={`http://b.io/ext_${invoice}-`}
          alt=""
          className={styles.icon}
        />
        <span>Invoice#{invoice}</span>
      </div>
      <div className={styles.cell}>{plan}</div>
      <div className={styles.cell}>$ {amount}</div>
      <div className={styles.cell}>
        <div className={`${styles.badge} ${badgeClass}`}>{status}</div>
      </div>
      <div className={`${styles.cell}`}>{date}</div>
      <div className={styles.cell}>
        <a href="#" className={styles.downloadLink}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbe011c27fe45416a12734e9154d8ebe4af32a5696e6dc45339e792995ff46d7?placeholderIfAbsent=true&apiKey=${REACT_APP_BUILDER_SUBSCRIPTION_KEY}"
            alt=""
            className={styles.icon}
          />
          Download
        </a>
      </div>
    </>
  );
};
