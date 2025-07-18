/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'bounce-once': 'bounce-once 1s ease-in-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            '> ul > li > *:first-child': {
              marginTop: '0',
            },
            '> ul > li > *:last-child': {
              marginBottom: '0',
            },
            '> ol > li > *:first-child': {
              marginTop: '0',
            },
            '> ol > li > *:last-child': {
              marginBottom: '0',
            },
            '> ul > li > p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            '> ol > li > p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            h1: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              textAlign: 'left',
            },
            h2: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.25rem',
              marginTop: '1.25rem',
              marginBottom: '0.625rem',
              textAlign: 'left',

            },
            h3: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.125rem',
              marginTop: '1rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1rem',
              marginTop: '0.875rem',
              marginBottom: '0.5rem',
            },
            h5: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '0.875rem',
              marginTop: '0.75rem',
              marginBottom: '0.375rem',
            },
            h6: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '0.75rem',
              marginTop: '0.625rem',
              marginBottom: '0.375rem',
            },
            p: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              lineHeight: '1.75',
              textAlign: 'justify',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            ul: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              textAlign: 'justify',
            },
            blockquote: {
              borderLeftColor: '#313DEB',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.375rem',
              textAlign: 'justify',
            },
            div: {
              textAlign: 'justify',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 