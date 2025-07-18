// API Configuration with robust fallback

const getApiUrl = () => {
  // Debug logging for environment variable
  console.log('🔍 Raw process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  console.log('🔍 Type of REACT_APP_API_URL:', typeof process.env.REACT_APP_API_URL);
  console.log('🔍 All REACT_APP env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP')));
  
  // Try environment variable first
  const envUrl = process.env.REACT_APP_API_URL;
  
  // Check if environment variable exists and is valid
  if (envUrl && envUrl !== 'undefined' && envUrl.trim() !== '') {
    return envUrl;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:5000';
};

const BASE_API_URL = getApiUrl();

const API_CONFIG = {
  BASE_URL: BASE_API_URL,
  ENDPOINTS: {
    // Dashboard endpoints
    DASHBOARD: {
      COLUMNS: `${BASE_API_URL}/dashboard/columns`,
      COLUMN_BY_ID: (id) => `${BASE_API_URL}/dashboard/columns/${id}`,
    },
    // You can add more endpoint categories here as needed
    // AUTH: {
    //   LOGIN: `${BASE_API_URL}/auth/login`,
    //   SIGNUP: `${BASE_API_URL}/auth/signup`,
    // },
    // JOBS: {
    //   LIST: `${BASE_API_URL}/jobs`,
    //   BY_ID: (id) => `${BASE_API_URL}/jobs/${id}`,
    // },
  }
};

// Debug logging to see what we're getting
console.log('🔧 API Config:', API_CONFIG);
console.log('🔧 Environment:', process.env.NODE_ENV);
console.log('🔧 REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);
console.log('🔧 Final API_URL being used:', BASE_API_URL);

export default API_CONFIG; 