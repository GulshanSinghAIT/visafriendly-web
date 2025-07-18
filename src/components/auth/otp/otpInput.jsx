import React, { useState } from "react";
import "./otpInput.css";

const OTPInput = () => {
  // const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [code, setCode] = React.useState("");

  // const handleKeyDown = (event, index) => {
  //   if (event.key === "Backspace" && !otp[index] && index > 0) {
  //     document.getElementById(`otp-input-${index - 1}`).focus();
  //   }
  // };

  return (
    <div className="otp-container">
      <label id="code">Enter your verification code</label>
      {/* {otp.map((code, index) => ( */}
      <input
        id="code"
        className="otp-input"
        value={code}
        name="code"
        onChange={(e) => setCode(e.target.value)}
      />
      {/* ))} */}
    </div>
  );
};

export default OTPInput;
