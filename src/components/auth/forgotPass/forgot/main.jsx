import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    window.location.href = "/blogs";
  }

  // Send the password reset code to the user's email
  async function create(e) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
         
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    
    // <div
    //   style={{
    //     margin: "auto",
    //     maxWidth: "500px",
    //   }}
    // >
    //   <h1>Forgot Password?</h1>
    //   <form
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: "1em",
    //     }}
    //     onSubmit={!successfulCreation ? create : reset}
    //   >
    //     {!successfulCreation && (
    //       <>
    //         <label htmlFor="email">Provide your email address</label>
    //         <input
    //           type="email"
    //           placeholder="e.g john@doe.com"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <button>Send password reset code</button>
    //         {error && <p>{error}</p>}
    //       </>
    //     )}

        // {successfulCreation && (
        //   <>
        //     <label htmlFor="password">Enter your new password</label>
        //     <input
        //       type="password"
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //     />

        //     <label htmlFor="password">
        //       Enter the password reset code that was sent to your email
        //     </label>
        //     <input
        //       type="text"
        //       value={code}
        //       onChange={(e) => setCode(e.target.value)}
        //     />

        //     <button>Reset</button>
        //     {error && <p>{error}</p>}
        //   </>
        // )}

        // {secondFactor && (
        //   <p>2FA is required, but this UI does not handle that</p>
        // )}
    //   </form>
    // </div>
  );
}

export default ForgotPasswordPage;
