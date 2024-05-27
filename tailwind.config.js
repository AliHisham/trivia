/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["Bangers", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FF6347", // Primary color (Main Theme)
          light: "#FFA07A", // Button Color (Hover/Active State)
          dark: "#FF4500", // Additional shade (optional)
        },
        secondary: {
          DEFAULT: "#FFD700", // Secondary color (Accent)
          dark: "#FFC100", // Additional shade (optional)
        },
        background: "#F5F5F5", // Background Color
        text: {
          primary: "#333333", // Text Color (Primary)
          secondary: "#666666", // Text Color (Secondary)
        },
        border: "#FF1493", // Border Color (Accent)
      },
      minWidth: {
        custom: "50rem",
      },
    },
  },
  plugins: [],
};
