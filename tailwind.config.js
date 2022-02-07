module.exports = {
  content: ["./pages/**/*.{html,js,ts,tsx,jsx}",
"./components/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      boxShadow: {
        'all_width': '0 0 0 100vw rgba(0, 0, 0, 0.5)',
        'all_height': '0 0 0 100vh rgba(0, 0, 0, 0.5)',
      },
       keyframes: {
        wiggle: {
          '0%, 100%': {
              transform: 'rotate(-3deg)'
          },
          '50%': {
              transform: 'rotate(3deg)'
          },
      },
        'fade-in-down': {
            '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
        'fade-out-down': {
          'from': {
              opacity: '1',
              transform: 'translateY(0px)'
          },
          'to': {
              opacity: '0',
              transform: 'translateY(10px)'
          },
      },
    },
    animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'wiggle' : 'wiggle 1s ease-in-out',
    }
    },
  },
  plugins: [

    require('tw-elements/dist/plugin')
  ],
}
