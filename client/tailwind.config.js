/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    corePlugins: {
        preflight: false
    },
    theme: {
        fontFamily: {
            sans: ["Poppins", "sans-serif"]
        },
        extend: {}
    },
    plugins: []
}
