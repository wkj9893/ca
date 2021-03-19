import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      "Noto Sans SC",
      'sans-serif',
    ].join(','),
  },
});

export default theme;