import React, { useState, useRef } from "react";
import "./otpInput.css";

const OTPInput = () => {
  const [code, setCode] = useState("");
  const inputRef = useRef(null);

  return (
    <div className="otp-container">
      <label id="code">Enter your verification code</label>
      <input
        ref={inputRef}
        id="code"
        className="otp-input"
        value={code}
        name="code"
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default OTPInput;
