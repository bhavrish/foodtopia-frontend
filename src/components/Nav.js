import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.textColor.main,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.textColor.main,
  },
}));

function Nav() {
  const classes = useStyles();

  return (
    <AppBar position='relative'>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Link href='/' className={classes.title}>
          <Typography component='h1' variant='h5'>
            Foodtopia
          </Typography>
        </Link>
        <RouterLink to='/auth/signin'>
          <Link className={classes.link}>
            Sign in
            <ExitToAppIcon />
          </Link>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
