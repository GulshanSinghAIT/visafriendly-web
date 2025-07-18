import * as React from "react";
import styles from "./HeroBanner.module.css";

export function HeroBanner() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.contentWrapper}>
            <img
              loading="lazy"
              src={`https://cdn.builder.io/api/v1/image/assets/TEMP/588f09a434f5b5b725d27486110e877965c930c333c7f1de30f1a046b41997a0?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`}
              className={styles.backgroundImage}
              alt=""
              aria-hidden="true"
            />
            <div className={styles.content}>
              <h1 className={styles.title}>
                Join VisaFriendly Today and Take the First Step Toward Your
                Dream Job!
              </h1>
              <button
                className={styles.ctaButton}
                onClick={() => {}}
                tabIndex={0}
                aria-label="Get Started With VisaFriendly"
              >
                Get Started With VisaFriendly
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
