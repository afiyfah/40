/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "oren-tua": "#EE8F36",
        "emas-teks": "#78450E",
      },
      backgroundImage: {
        "emas-main": "linear-gradient(90deg, #BFA370 39%, #8E754A 82%)",
        "oren-grd": "linear-gradient(90deg, #FF7A3D 0%, #FF9A6A 100%)",
        "gold-grd": "linear-gradient(90deg, #B88214 0%, #E1BF59 100%)",
      },
    },
  },
  plugins: [],
};
