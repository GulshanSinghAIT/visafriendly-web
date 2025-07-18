import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/fonts.css";
import { OtpProvider } from "./components/auth/forgotPass/OTPContext";
import "./assets/fonts/Gellix-Regular.ttf";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <OtpProvider>
      <App />
    </OtpProvider>
  </React.StrictMode>
);

reportWebVitals();
