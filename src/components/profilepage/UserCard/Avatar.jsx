import React from "react";
import styles from "./Avatar.module.css";

export const Avatar = ({ firstName, lastName , url}) => {
  console.log("Avatar component rendered with:", { firstName, lastName, url });
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

  return (
    url ? (
      <img
        className={styles.avatar}
        src={url}
        alt={`${firstName} ${lastName}'s profile`}
      />
    ) : (
      <div
        className={styles.avatar}
        role="img"
        aria-label={`${firstName} ${lastName}'s profile avatar`}
      >
        {initials}
      </div>
    )
  );
};
