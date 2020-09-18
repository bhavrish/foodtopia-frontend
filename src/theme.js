import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light', // light or dark mode
    background: {
      default: '', // add background color hex code
    },
    primary: {
      main: '', // add primary hex code
    },
  },

  // add more css properties as desired
});

export default theme;
