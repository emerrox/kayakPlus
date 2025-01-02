// tailwind.config.js
import plugin from 'tailwindcss/plugin';

module.exports = {
    darkMode: ['class'],
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
  				'950': '#1c214f'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		boxShadow: {
  			custom: '0px 8px 20px rgba(145, 145, 145, 0.2)'
  		},
  		fontFamily: {
  			headings: [
  				'CalSans'
  			],
  			geist: [
  				'Geist'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
      require("tailwindcss-animate")
],
};
