/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "#46A358",
        "green-dark": "#3D8B4F",
        "gray-dark": "#3D3D3D",
        "gray-light": "#727272",
      },
      textColor: {
        "primary-text": "#374151",
      },
    },
  },
  plugins: [],
};
