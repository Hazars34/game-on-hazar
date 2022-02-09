import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#F4DF4EFF',
    },
    secondary: {
      main: '#949398FF',
    },
    mode: 'dark',
  },

  typography: {
    fontFamily: 'Raleway',
    h1: { fontSize: '3rem' },
    h2: { fontSize: '2.5rem' },
    h3: { fontSize: '2.25rem' },
    h4: { fontSize: '2.125rem' },
  },
})
