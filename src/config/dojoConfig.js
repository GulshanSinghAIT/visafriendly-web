// config/dojoConfig.js
export const DOJO_CONFIG = {
  API_KEY: process.env.REACT_APP_DOJO_API_KEY,
  CLIENT_KEY: process.env.REACT_APP_DOJO_CLIENT_KEY,
  SANDBOX_MODE: process.env.NODE_ENV !== "production", // Use sandbox for development
  SUBSCRIPTION_PLANS: {
    MONTHLY: {
      id: "monthly_premium",
      price: 999, // $9.99 in cents
      currency: "USD",
      interval: "month",
      interval_count: 1,
    },
    QUARTERLY: {
      id: "quarterly_premium",
      price: 2499, // $24.99 in cents
      currency: "USD",
      interval: "month",
      interval_count: 3,
    },
    BIANNUAL: {
      id: "biannual_premium",
      price: 3599, // $35.99 in cents
      currency: "USD",
      interval: "month",
      interval_count: 6,
    },
  },
};
