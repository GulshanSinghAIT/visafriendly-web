// NotificationSection.jsx
import React from "react";
import NotificationToggle from "./NotificationToggle";
import styles from "./NotificationSection.module.css";
import PropTypes from "prop-types";

const NotificationSection = ({ title, items, onToggleChange }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <div
            key={`${title.toLowerCase()}-${item.title}`}
            className={styles.notificationItem}
          >
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>
                {item.title}
              </h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
            <NotificationToggle
              defaultChecked={item.enabled}
              type={title.toLowerCase()}
              title={item.title}
              description={item.description}
              onToggleChange={(enabled) => onToggleChange(item.title, enabled)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

NotificationSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      enabled: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleChange: PropTypes.func.isRequired,
};

export default NotificationSection;
