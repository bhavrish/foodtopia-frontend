import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light', // light or dark mode
    background: {
      default: '#f6f4e6', // add background color hex code
    },
    primary: {
      main: "#e09465",
      contrastText: '#000',
    },
    secondary: {
      main: "#f1d07b",
      contrastText: '#000',
    },
  },

  // add more css properties as desired
});

export default theme;
