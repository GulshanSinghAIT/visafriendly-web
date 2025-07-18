// NotificationToggle.jsx
import React, { useState, useEffect } from "react";
import styles from "./NotificationToggle.module.css";
import PropTypes from "prop-types";

const NotificationToggle = ({
  defaultChecked = true,
  type,
  title,
  description,
  onToggleChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    const newStatus = !isChecked;

    try {
      // Call the parent's onToggleChange function
      if (onToggleChange) {
        onToggleChange(newStatus);
      }
      setIsChecked(newStatus);
    } catch (error) {
      console.error("Failed to update notification preference:", error);
      // Revert to previous state on error
      setIsChecked(isChecked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className={styles.input}
          disabled={isLoading}
          aria-label={`Toggle ${title} notifications`}
        />
        <span
          className={`${styles.slider} ${isLoading ? styles.loading : ""}`}
        />
      </label>
    </div>
  );
};

NotificationToggle.propTypes = {
  defaultChecked: PropTypes.bool,
  type: PropTypes.oneOf(["jobs", "profile", "newsletter", "announcements"])
    .isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onToggleChange: PropTypes.func,
};

NotificationToggle.defaultProps = {
  defaultChecked: true,
};

export default NotificationToggle;
