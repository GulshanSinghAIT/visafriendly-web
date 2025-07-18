import React, { createContext, useState, useContext } from "react";

const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  return (
    <OtpContext.Provider value={{ otp, setOtp, email, setEmail }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => {
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("useOtp must be used within an OtpProvider");
  }
  return context;
};
