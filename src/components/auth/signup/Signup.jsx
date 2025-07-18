import React, { useState } from "react";
import styles from "./Signup.module.css";
import { FormInput } from "./FormInput";
import { formFields } from "./formFields";
import { useSignUp } from "@clerk/clerk-react";
import OTP from "../otp/SignupPage";
import { Link } from "react-router-dom";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const router = useRouter();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  // Function to record login for streak tracking
  

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
    
    // Validate field on change
    let errorMessage = "";
    switch (id) {
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    
    setFieldErrors((prev) => ({ ...prev, [id]: errorMessage }));
  };

  function login() {
    window.location.href = "/login";
  }

  // Handle submission of the sign-up form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    setFieldErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // If there are any errors, don't proceed
    if (emailError || passwordError || confirmPasswordError ) {
      return;
    }

    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        
        window.location.href = "/onboarding/ContactDetails";
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return <OTP password={formData.password} />;
  }

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  return (
    <div className="rightSection overflow-y-auto">
      <div className={styles.signupWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Join Visafriendly</h1>
          <p className={styles.subtitle}>
            Create your account to explore visa opportunities and manage
            applications seamlessly.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            {formFields.map((field) => (
              <div key={field.id}>
                <FormInput
                  {...field}
                  value={formData[field.id]}
                  onChange={handleChange}
                  error={fieldErrors[field.id]}
                />
                {fieldErrors[field.id] && (
                  <p className={styles.fieldError}>{fieldErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.termsCheckbox}>
            <label htmlFor="agreeToTerms" className={styles.termsLabel}>
              By signing up, you agree to the{" "}
              <Link to="/terms" className={styles.termsLink}>
                 Terms and Conditions 
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className={styles.termsLink}>
                 Privacy Policy 
              </Link>
            </label>
           
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.loginPrompt}>
          <span className={styles.loginText}>Already have an account? </span>
          <Link className={styles.loginLink} to="/login">
            <b>Log in</b>
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
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
