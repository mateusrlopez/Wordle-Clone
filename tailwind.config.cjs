const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,ts}'],
    theme: {
        screens: {
            'xs': '320px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                'helvetica-neue': ['Helvetica Neue', 'sans-serif'],
            },
        },
    },
};
