import React, { useState } from "react";
import styles from "./Signup.module.css";
import { FormInput } from "./FormInput";
import { formFields } from "./formFields";
import { useSignIn } from "@clerk/clerk-react";
import { useOtp } from "../OTPContext.js";

export const Signup = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setEmail } = useOtp();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
  });

  function log() {
    window.location.href = "/signup";
  }
  // Send the password reset code to the user's email
  async function create(e) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: formData.email,
      })
      .then((_) => {
        // setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: false })); // Reset error for the field
  };

  // Handle the submission of the sign-in form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    setLoading(true);
    
    // Store email in context for use in password reset flow
    setEmail(formData.email);
    
    create(e);
    window.location.href = "/otp";
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="rightSection mx-auto my-auto px-5">
      <div className={styles.signupWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>
            Enter your registered email to receive password reset OTP.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            {formFields.map((field) => (
              <div key={field.id}>
                <FormInput
                  key={field.id}
                  {...field}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    fieldErrors.email ? styles.inputError : ""
                  }`}
                />
              </div>
            ))}
            {fieldErrors.email && (
              <span className={styles.errorText}>
                Incorrect email or password
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            Send OTP
          </button>
        </form>

        <div className={styles.loginPrompt}>
          <span className={styles.loginText}>Don't have an account? </span>
          <button className={styles.loginLink} onClick={log}>
            {" "}
            <b>Sign Up</b>
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>OR</span>
          <span className={styles.dividerLine} />
        </div>

        <button className={styles.googleButton}>
          <img
            src={`https://cdn.builder.io/api/v1/image/assets/TEMP/3d1e6a3f5a5d70f76d7019830469d6f0a6d1c8585d597b7ec791829a7ecfa83a?apiKey=${process.env.REACT_APP_API_NEW_KEY}`}
            alt="Google logo"
            className={styles.googleIcon}
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};
