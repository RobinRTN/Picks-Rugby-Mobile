import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "App.{tsx,jsx,ts,js}",
    "index.{tsx,jsx,ts,js}",
    "components/**/*.{tsx,jsx,ts,js}"
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        green: {
          main: '#007A5C',
          light: '#049D75',
          lighter: '#02B586',
          lightest: '#00D395',
          dark: '#005239',
          darker: '#00422E',
          darkest: '#003223',
        },
        blue: {
          main: '#01547C',
          light: '#016690',
          lighter: '#0178B4',
          lightest: '#018AD8',
          purple: '#3B33AE',
          gradStart: '#003DB3',
          gradEnd: '#00B89E',
          dark: '#003223',
          darker: '#002219',
          darkest: '#00120F',
        },
        red: {
          main: '#E8634E',
          light: '#F07A65',
          lighter: '#F4917B',
          lightest: '#F8A891',
          dark: '#D1493B',
          darker: '#B53E34',
          darkest: '#99332D',
        },
        beige: {
          main: '#F9EED2',     // Your original cream
          light: '#FCFAF0',    // Lighter, almost white cream
          lighter: '#FDF8F4',  // Very light warm cream
          lightest: '#FEFCF9', // Almost white with warm undertone
          dark: '#F3E1B8',     // Darker cream/beige
          darker: '#EDD4A1',   // More golden beige
          darkest: '#E6C78A',  // Rich golden beige
        },
      },
      fontFamily: {
        // Outfit for headings (h1, h2, h3, etc.)
        heading: [
          'Outfit', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Manrope for body text
        body: [
          'Manrope', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Outfit for display text (large headers, hero text)
        display: [
          'Outfit', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Manrope variations
        manrope: [
          'Manrope', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Outfit variations  
        outfit: [
          'Outfit', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Monospace for code
        mono: [
          'ui-monospace', 
          'SFMono-Regular', 
          'Monaco', 
          'Consolas', 
          'Liberation Mono', 
          'Courier New', 
          'monospace'
        ],
      },
      fontWeight: {
        // Manrope weights (200-800)
        'extra-light': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semi-bold': '600',
        'bold': '700',
        'extra-bold': '800',
        
        // Outfit weights (100-900)
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
        
        // Legacy
        'extrablack': '950',
      },
      fontSize: {
        '2xs': '10px',
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
        '7xl': '72px',
        '8xl': '96px',
        '9xl': '128px',
      },
      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(0, 0, 0, 0.3)',
        'hard-2': '0px 3px 10px 0px rgba(0, 0, 0, 0.25)',
        'hard-3': '2px 2px 8px 0px rgba(0, 0, 0, 0.3)',
        'hard-4': '0px -3px 10px 0px rgba(0, 0, 0, 0.25)',
        'hard-5': '0px 2px 10px 0px rgba(0, 0, 0, 0.15)',
        'soft-1': '0px 0px 10px rgba(0, 0, 0, 0.2)',
        'soft-2': '0px 0px 20px rgba(0, 0, 0, 0.3)',
        'soft-3': '0px 0px 30px rgba(0, 0, 0, 0.2)',
        'soft-4': '0px 0px 40px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [gluestackPlugin],
};
