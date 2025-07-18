import React from "react";
import HeroImage from "./HeroImage";
import styles from "./SignupPage.module.css";
import { Signup } from "./Signup";

export default function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <HeroImage />
        <Signup />
      </div>
    </main>
  );
}
