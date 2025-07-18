import React from "react";
import styles from "./WhySubscribe.module.css";

const StatCard = ({ icon, title, value }) => {
  return (
    <article className={styles.statCard}>
      <img
        loading="lazy"
        src={icon}
        alt=""
        className={styles.cardIcon}
        aria-hidden="true"
      />
      <h3 className={styles.cardTitle}>{title}</h3>
    </article>
  );
};

const WhySubscribe = () => {
  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf236f8c44ed894395e12563d49cb2c0f734a6091e8ac5186d8bd7cd57ee15c7",
      title: "Increased Interview Chances",
      value: "5x",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d43d7b9f714b1eace7b992a5fc0ac2a3d4f12a62cef91f9edf2f80a9defeb42",
      title: "Time Saved on Applications",
      value: "160+/hours",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d89f1735ed26ef32a72f9bb13c38fbd7e08a4b40cc90e47fa424eb6d63aa8a93",
      title: "Potential Full-Time Earnings",
      value: "$50/hours",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/96af33196ef2e7be312434dc539ab8a90ad5e84f35a23d23eab84d1a34de36b2",
      title: "Reduce Search Time",
      value: "3x",
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>Why become a VisaFriendly Plus Member?</h2>
          <p className={styles.subtitle}>
          Join over 2k+ members who've landed jobs faster. Be next!
          </p>
        </header>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySubscribe;
