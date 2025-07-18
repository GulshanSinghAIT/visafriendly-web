import React from "react";
import styles from "./JobCard.module.css";

export const JobCard = ({
  title,
  type,
  location,
  salary,
  schedule,
  tags,
  company,
  logo,
  postedDate,
  bookmarkIcon,
  locationIcon,
  salaryIcon,
  scheduleIcon,
  timeIcon,
}) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.titleWrapper}>
            <div className={styles.jobTitle}>{title}</div>
            <div className={styles.jobType}>{type}</div>
          </div>
        </div>
        <img src={bookmarkIcon} alt="" className={styles.bookmarkIcon} />
      </div>

      <div className={styles.divider} />

      <div className={styles.details}>
        <div className={styles.location}>
          <img src={locationIcon} alt="" />
          <span>{location}</span>
        </div>
        <div className={styles.salary}>
          <img src={salaryIcon} alt="" />
          <span>{salary}</span>
        </div>
        <div className={styles.schedule}>
          <img src={scheduleIcon} alt="" />
          <span>{schedule}</span>
        </div>
      </div>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.companyInfo}>
        <div className={styles.company}>
          <img
            src={logo}
            alt={`${company} logo`}
            className={styles.companyLogo}
          />

          <span className={styles.companyName}>{company}</span>
        </div>
        <div className={styles.postedDate}>
          <img src={timeIcon} alt="" className={styles.time} />
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};
