export const JOB_TYPES = [
  { id: "fulltime", label: "Full-time" },
  { id: "contract", label: "Contract" },
  { id: "parttime", label: "Part-time" },
  { id: "internship", label: "Internship" },
];

export const EXPERIENCE_OPTIONS = [
  { id: "lessThanOne", label: "< 1 Year" },
  { id: "oneToTwo", label: "1-2 Years" },
  { id: "twoToFive", label: "2-5 Years" },
  { id: "moreThanFive", label: "5+ Years" },
];

export const ROLES = [
  { id: "softwareEngineer", label: "Software Engineer", variant: "warning" },
  { id: "frontendEngineer", label: "Frontend Engineer", variant: "primary" },
  { id: "productAnalyst", label: "Product Analyst", variant: "success" },
  { id: "aiEngineer", label: "AI/ML Engineer", variant: "primary" },
];

export const SOCIAL_LINKS = [
  {
    id: "website",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d1fd4a3e5d0abca9292716dae6be393242e46168d79bfcfed81713be4433a1a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    label: "Website",
    placeholder: "https://www.google.com",
  },
  {
    id: "linkedin",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb375e91d7f92b531398d50389c7ba9fa725cbd95aa201df7c35dcd82e5df4e9?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    label: "LinkedIn Profile",
    placeholder: "https://linkedin.com",
  },
  {
    id: "github",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5a0d3d55580357aa6b03bfd3e57a19718e4adbf6a29dabe7b27ac594b4ee981?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    label: "GitHub",
    placeholder: "https://github.com/username",
  },
  {
    id: "twitter",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ccbf2fea46586e296476ee4b6a83da961ebcdaf4533495ae1895fd478c2d5b3?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    label: "Twitter",
    placeholder: "https://twitter.com/username",
  },
];

export const Skills = [
  { id: "business_analytics", label: "Business Analytics" },
  { id: "web_development", label: "Web Development" },
  { id: "software_engineering", label: "Software Engineering" },
  { id: "backend_development", label: "Backend Development" },
];
