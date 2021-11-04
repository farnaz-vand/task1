import { createTheme } from '@mui/material/styles';
import { orange, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: grey,
  },
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Arial',
  },
  components: {
    MuiCssBaseline: {
      // TODO: add other font-weight too!
      styleOverrides: `
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-weight: 400;
          src: local('IRANSans'), url('${process.env.PUBLIC_URL}/fonts/IRANSans.ttf') format('truetype');
        }
      `,
    },
  },
});

export default theme;
