import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fafaf6',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontSize: '1rem',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default theme;
