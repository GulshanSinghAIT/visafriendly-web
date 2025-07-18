import React, { useState } from "react";
import styles from "./Signup.module.css";
import { formFields } from "./formFields";
import { useSignIn } from "@clerk/clerk-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Signup = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: false })); // Reset error for the specific field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        window.location.href = "/profile";
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      const errorMessage = err.errors?.[0]?.message || "Something went wrong";
      console.error(errorMessage);
      setError(errorMessage);

      // Set errors only for specific fields
      setFieldErrors({
        email: true,
        password: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rightSection flex justify-center w-full items-center">
      <div className={styles.signupWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>
            Log in to manage your visa applications and updates.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            {formFields.map((field) => (
              <div
                key={field.id}
                className={
                  field.type === "password" ? styles.passwordWrapper : ""
                }
              >
                <label htmlFor={field.id}>{field.label}</label>{" "}
                {field.type === "password" ? (
                  <>
                    <input
                      id={field.id}
                      type={
                        showPassword && field.type === "password"
                          ? "text"
                          : "password"
                      } // Show password only if it's a password field
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className={`${styles.input} ${
                        field.type === "password"
                          ? styles.passwordInput
                          : field.type === "email"
                          ? styles.emailInput
                          : ""
                      } ${fieldErrors[field.id] ? styles.inputError : ""}`}
                    />

                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </>
                ) : (
                  field.type === "email" && (
                    <>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className={`${styles.input} ${
                          fieldErrors[field.id] ? styles.inputError : ""
                        }`}
                      />
                    </>
                  )
                )}
              </div>
            ))}
            {(fieldErrors.email || fieldErrors.password) && (
              <span className={styles.errorText}>
                Incorrect email or password
              </span>
            )}
            <div>
              <a href="/forgotPassword" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            Login
          </button>
        </form>

        <div className={styles.loginPrompt}>
          <span className={styles.loginText}>Don't have an account? </span>
          <Link className={styles.loginLink} to="/signup">
            <b>Sign Up</b>
          </Link>
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
