import React from "react";
import { SOCIAL_LINKS } from "../../constants/formOptions";
import styles from "./SocialLinks.module.css";

export const SocialLinks = ({ existingLinks = {}, onChange }) => {
  const handleChange = (id, value) => {
    if (onChange) {
      onChange(id, value);
    }
  };

  return (
    <div className={styles.socialLinks}>
      {SOCIAL_LINKS.map(({ id, icon, label, placeholder }) => (
        <div
          key={id}
          className={
            id !== "linkedin"
              ? id !== "twitter"
                ? styles.socialLink
                : styles.socialLinkTwitter
              : styles.socialLinkLinkedin
          }
        >
          <div className={styles.socialHeader}>
            <label htmlFor={id} className={styles.socialLabel}>
              {label}
            </label>
          </div>
          <div className={styles.inputGroup}>
            {/* First Input Bar */}
            <input
              type="text"
              id={`${id}-protocol`}
              className={styles.protocolInput}
              value="https://"
              readOnly
            />
            {/* Second Input Bar */}
            <input
              type="text"
              id={id}
              className={styles.restInput}
              placeholder={placeholder.replace("https://", "")}
              value={
                existingLinks[id]
                  ? existingLinks[id].replace("https://", "")
                  : ""
              }
              onChange={(e) => {
                const fullUrl = `https://${e.target.value}`;
                handleChange(id, fullUrl);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
