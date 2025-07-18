import React from "react";
import { StatCard } from "./StatCard";
import styles from "./StatsSection.module.css";

const stats = [
  { number: "60K+", label: "Visa-friendly jobs posted" },
  { number: "3K+",label: "Active members" },
  { number: "50K+", label: "Sponsoring Companies" },
  { number: "90K+", label: "Jobs Applied" },
];

const companyLogos = [
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/86764caeb09145af8606ecb30c4a3ba6f38edd8c5fc9ffdfadbb545775b5e26e?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/8d6e7c1fb35f50293350307a8e195b28a6b7c353e8fa0b743d8748f0670ccc7e?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/ddfd3aff3d66eb31e2c480fc10f6086e3140fd9317de9de4a80e2416138c2cb7?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/e5fe4852639c6c3d6a528f91d55abee7577cbc9c939c28d43e275497aea8c999?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/6bd684c7df2f1bac422250f329e8f1a5e11cd6708597eb315585305b15b5c612?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/c6b97d007e6e6b5048cd48fb7dbc69b4323cabb59f0e24d0e85db76eef6ae7f6?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/8a72352c6f56e87f95574ce04090b1f656ab80f48b4302b0bdfe63355774ca1a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
  {
    src: `https://cdn.builder.io/api/v1/image/assets/TEMP/58a23d5e1aba4ae0d850bbf7e28c08ae455291e52e73c1eec9370ae4a5f81919?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    width: 10.42,
  },
];

export function StatsSection() {
  return (
    <section className={styles.statsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerContent}>
          <div className={styles.textContent}>
            <div className={styles.headingWrapper}>
              <h1 className={styles.mainHeading}>
              The #1 Platform for Visa-Sponsored Jobs in the U.S.
              </h1>
            </div>
            <p className={styles.subHeading}>
            Join a fast-growing global community using VisaFriendly to find internships, co-ops, and full-time jobs at top U.S. companies actively sponsoring H-1B and Green Cards.
            </p>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
        <div className={styles.divider} role="separator" />
        <h2 className={styles.companiesHeading}>Leading Employers Sponsoring Global Talent</h2>
        <div className={styles.logos}>
          <div className={styles.logoGrid}>
            {companyLogos.map((logo, index) => (
              <img
                key={index}
                loading="lazy"
                src={logo.src}
                alt="Partner company logo"
                className={styles.companyLogo}
                style={{
                  width: `${logo.width}vw`,
                  // aspectRatio: logo.ratio,
                }}
              />
            ))}
          </div>
          <div className={styles.logoGrid}>
            {companyLogos.map((logo, index) => (
              <img
                key={index}
                loading="lazy"
                src={logo.src}
                alt="Partner company logo"
                className={styles.companyLogo}
                style={{
                  width: `${logo.width}vw`,
                  aspectRatio: logo.ratio,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
