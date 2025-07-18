import React, { useState, useEffect, useRef } from "react";
import styles from "./Signup.module.css";
import { useOtp } from "../OTPContext.js";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const { otp, setOtp } = useOtp();
  const [code, setCode] = useState("");
  const inputRefs = useRef([]);

  // Initialize refs for each input
  useEffect(() => {
    inputRefs.current = Array(6)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, []);

  function signup() {
    window.location.href = "/signup";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOtp(code);
  }

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newCode = code.split("");
      newCode[index] = value;
      const updatedCode = newCode.join("");
      setCode(updatedCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        inputRefs.current[index - 1].focus();
        const newCode = code.slice(0, -1);
        setCode(newCode);
      } else {
        // Clear current input
        const newCode = code.split("");
        newCode[index] = "";
        setCode(newCode.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      setCode(pastedData);
      // Focus last input or the input after the last pasted number
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  useEffect(() => {
    if (otp) {
      setTimeout(() => {
        navigate("/resetPassword");
      }, 100);
    }
  }, [otp, navigate]);

  return (
    <div className="rightSection mx-auto my-auto md:px-5 w-[95%] md:w-auto ">
      <div className={styles.signupWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Enter OTP</h1>
          <p className={styles.subtitle}>Enter OTP sent to your email</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.otpContainer}>
            <label htmlFor="code" className={styles.otpLabel}>
              Enter OTP
            </label>
            <div className={styles.otpInputs}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={code[index] || ""}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Reset Password
          </button>
        </form>

        {/* <div className={styles.loginPrompt}>
          <span className={styles.loginText}>Don't have an account? </span>
          <button className={styles.loginLink} onClick={signup}>
            <b>Sign Up</b>
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>OR</span>
          <span className={styles.dividerLine} />
        </div> */}

        {/* <button className={styles.googleButton}>
          <img
            src={`https://cdn.builder.io/api/v1/image/assets/TEMP/3d1e6a3f5a5d70f76d7019830469d6f0a6d1c8585d597b7ec791829a7ecfa83a?apiKey=${process.env.REACT_APP_API_NEW_KEY}`}
            alt="Google logo"
            className={styles.googleIcon}
          />
          <span>Login with Google</span>
        </button> */}
      </div>
    </div>
  );
};
