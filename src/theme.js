import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light', // light or dark mode
    background: {
      default: '#fff', // add background color hex code
    },
    primary: {
      main: '#F0C044',
      contrastText: '#000',
    },
    textColor: {
      main: '#000',
    },
    textBackground: {
      main: '#F6F6F6', 
    },
    buttonColor1: {
      main: '#EC8C6D', 
    },
    buttonColor2: {
      main: '#92B46B', 
    },
  },

  // add more css properties as desired
});

export default theme;
