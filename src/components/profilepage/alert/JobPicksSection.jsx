import React, { useState } from "react";
import styles from "./JobPicksSection.module.css";

const JobPicksSection = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <section
      className={styles.jobPicksSection}
      aria-label="Job recommendations"
    >
      <div className={styles.jobPicksContent}>
        <div className={styles.jobPicksInfo}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3d2c499bd96be274422ad0ae04fa9316116143c83de3ebbc70f7470834c3605?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}"
            alt="Job picks icon"
            className={styles.jobPicksIcon}
          />
          <div>
            <h2 className={styles.jobPicksTitle}>Top job picks for you</h2>
            <p className={styles.jobPicksDescription}>
              Get recommended jobs based on your profile and activity
            </p>
          </div>
        </div>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
            className={styles.toggleInput}
          />
          <span className={styles.switchTrack}>
            <span
              className={`${styles.switchThumb} ${
                isEnabled ? styles.enabled : ""
              }`}
            />
          </span>
        </label>
      </div>
    </section>
  );
};

export default JobPicksSection;
