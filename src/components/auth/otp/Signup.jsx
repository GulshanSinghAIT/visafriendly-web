import React, { useState, useRef } from "react";
import styles from "./Signup.module.css";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { CheckCircle, ArrowRight } from "lucide-react"

export const Signup = (password) => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showPopup, setShowPopup] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const inputRefs = useRef([]);

  const handleContinue = async () => {
    try {
      if (sessionId) {
        await setActive({ session: sessionId });
        navigate("/onboarding/ContactDetails", { state: { password } });
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  const Popup = () => {
    return (
      <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 px-8 pt-8 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Aboard! 🎉</h1>
          <p className="text-gray-600 leading-relaxed">
            Your account has been created successfully. You're now part of the VisaFriendly community!
          </p>
        </div>

        {/* Content section */}
        <div className="px-8 py-6 ">

          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r flex justify-center items-center  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Continue to Profile Setup
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

     
      </div>
    </div>
    );
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: code.join(""),
      });
      if (signUpAttempt.status === "complete") {
        setSessionId(signUpAttempt.createdSessionId);
        setShowPopup(true);
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Add useEffect to monitor popup state
  React.useEffect(() => {
    console.log("Popup state changed:", showPopup);
  }, [showPopup]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {console.log("Rendering with showPopup:", showPopup)}
      {showPopup && (
        <Popup />
      )}
      <div className="rightSection">
        <div className={styles.signupWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>Enter OTP</h1>
            <p className={styles.subtitle}>Enter OTP sent to your email</p>
          </header>

          <form onSubmit={handleVerify} className={styles.form}>
            <div className={styles.otpContainer}>
              <label htmlFor="code" className={styles.otpLabel}>
                Enter OTP
              </label>
              <div className={styles.otpInputs}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    className={styles.otpInput}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Confirm
            </button>
          </form>

          <div className={styles.loginPrompt}>
            <span className={styles.loginText}>Already have an account? </span>
            <button className={styles.loginLink}>
              <b>Log in</b>
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
            <span>Sign Up with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};
