import React from "react";
import styles from "./Avatar.module.css";

export const Avatar = ({ firstName, lastName }) => {
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

  return (
    <div
      className={styles.avatar}
      role="img"
      aria-label={`${firstName} ${lastName}'s profile avatar`}
    >
      {initials}
    </div>
  );
};
