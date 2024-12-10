// tailwind.config.js
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryGradient: 'linear-gradient(135deg, #aabae9, #7ba8dc00)',
        secondaryGradient: 'radial-gradient(circle, #edecec, #c0c7d9)',
        highlightGradient: 'linear-gradient( #6c93ef, #2368d6)',
        backgroundColor: '#f0f0f0',
        textPrimary: '#131313',
        textSecondary: '#a3a3b3',
        'royal-blue': {
        '50': '#f0f4fe',
        '100': '#dee6fb',
        '200': '#c4d5f9',
        '300': '#9bb9f5',
        '400': '#6c95ee',
        '500': '#3d67e6',
        '600': '#3453dc',
        '700': '#2b40ca',
        '800': '#2936a4',
        '900': '#263282',
        '950': '#1c214f',
    },
    
      },
      boxShadow: {
        custom: '0px 8px 20px rgba(145, 145, 145, 0.2)',
      },
      fontFamily: {
        headings: ["CalSans"],
        geist: ["Geist"]
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.highlight-gradient': {
          backgroundImage: 'linear-gradient(#6c93ef, #2368d6)',
        },
        '.secondary-gradient': {
          backgroundImage: 'radial-gradient(circle, #edecec, #c0c7d9)',
        },
      });
    }),
  ],
};
