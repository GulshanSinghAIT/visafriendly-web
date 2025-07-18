import React from "react";
import HeroImage from "./HeroImage";
import styles from "./SignupPage.module.css";
import { Signup } from "./Signup";

export default function ForgotPassword() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
       <div className=" absolute top-10 left-3 md:left-10">
        <img src="/images/logo_expanded.png" alt="visafriendly" className="h-10" />
      </div>
        <Signup />
      </div>
    </main>
  );
}
