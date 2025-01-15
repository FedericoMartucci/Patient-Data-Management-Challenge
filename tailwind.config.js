/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4108D1",
        secondary: "#C2085B",
        error: "#EA153C",
        lighterror: "#F3003A",
        white: "#FAFAFA",
        extrawhite: "#FFFFFF",
        gray: {
          100: "#F7F7F7",
          200: "#EEEEEE",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121"
        },
        black: "#120340"
      },
      fontFamily: {
        poppins: ["Poppins"]
      },
      boxShadow: {
        loginBox: "0 0 12px 4px rgba(0, 0, 0, 0.6)",
        2: "0px 2px 20px 0px #43FFDD1A",
        button: "0 0 10px 2px rgb(36 36 36 / 0.5)",
        buttonClicked: "0 0 2px 2px rgb(36 36 36 / 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
