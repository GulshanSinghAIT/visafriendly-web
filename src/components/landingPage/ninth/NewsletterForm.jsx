import React from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import styles from "./Footer.module.css";

export const NewsletterForm = () => {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  return (
    <form
      className={`${styles.newsletterForm} ${
        isSignedIn ? styles.signedIn : ""
      }`}
    >
      <SignedOut>
        <input
          type="email"
          placeholder="Enter your Email Address"
          className={styles.emailInput}
          aria-label="Enter your email address"
        />
        <button type="submit" className={styles.subscribeButton}>
          Subscribe
        </button>
      </SignedOut>
      <SignedIn>
        <input
          type="email"
          placeholder={email}
          className={styles.emailInputAfterLogin}
          aria-label="Enter your email address"
        />
        <button type="submit" className={styles.subscribeButton}>
          Subscribed
        </button>
      </SignedIn>
    </form>
  );
};
