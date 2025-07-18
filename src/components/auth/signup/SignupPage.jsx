import React from "react";
import HeroImage from "./HeroImage";
import styles from "./SignupPage.module.css";
import Signup from "./Signup";
import Cookies from "js-cookie";

export default function SignUp() {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  const value = parameters.get("ref");
  if (value !== null) {
    Cookies.set("ref", value, { expires: 14, path: "/" });
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <HeroImage />
        <Signup />
      </div>
    </main>
  );
}
