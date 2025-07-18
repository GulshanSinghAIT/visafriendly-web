import React, { useState, useEffect } from "react";
import { Avatar } from "./Avatar";
import styles from "./UserProfile.module.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!email) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/avatar/${email}`
        );

        if (response.data.success) {
          const userData = response.data.data;
          setFirstName(userData.firstName || "Hello, ");
          setLastName(userData.lastName || " User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Keep default names if there's an error
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <div className={styles.container}>
      <Avatar firstName={firstName} lastName={lastName} />
      <a href="">
        <div className={styles.editWrapper}>
          <img src="/images/pencil.png" className={styles.edit}></img>
        </div>
      </a>
      <h1 className={styles.userName}>{`${firstName} ${lastName}`}</h1>
    </div>
  );
};
