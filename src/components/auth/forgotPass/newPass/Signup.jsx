import React, { useState } from "react";
import styles from "./Signup.module.css";
import { formFields } from "./formFields";
import { useSignIn } from "@clerk/clerk-react";
import { useOtp } from "../OTPContext.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Signup = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { otp, email } = useOtp();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function log() {
    window.location.href = "/signup";
  }

 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    setLoading(true);
    reset(e);
  };

  async function reset(e) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: otp,
        password: formData.password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setError("");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          
          window.location.href = "/success";
        } else {
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="rightSection mx-auto my-auto md:px-5 w-[95%] md:w-auto ">
      <div className={styles.signupWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Setup New Password</h1>
          <p className={styles.subtitle}>Create new password</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            {formFields.map((field) => (
              <div key={field.id} className={styles.passwordWrapper}>
                <label htmlFor={field.id}>{field.label}</label>
                <div className={styles.inputContainer}>
                  <input
                    id={field.id}
                    type={
                      field.id === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`${styles.input} ${
                      fieldErrors[field.id] ? styles.inputError : ""
                    }`}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() =>
                      field.id === "password"
                        ? setShowPassword((prev) => !prev)
                        : setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      field.id === "password"
                        ? showPassword
                          ? "Hide password"
                          : "Show password"
                        : showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {field.id === "password" ? (
                      showPassword ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )
                    ) : showConfirmPassword ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </button>
                </div>
              </div>
            ))}
            {error && <span className={styles.errorText}>{error}</span>}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            Reset Password
          </button>
        </form>

   

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
