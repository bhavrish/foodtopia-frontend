import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: '30px',
    textDecoration: 'none',
    color: theme.palette.textColor.main,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.textColor.main,
  },
}));

export default function Nav() {
  const authContext = useContext(AuthContext);

  const classes = useStyles();
  const dashboardLink = (
    <RouterLink to='/customer/dashboard'>
      <Link className={classes.link}>
        <Typography component='h1' variant='h5' color='inherit' noWrap>
          Dashboard
        </Typography>
      </Link>
    </RouterLink>
  );

  return (
    <AppBar position='relative'>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography
          component='h1'
          variant='h4'
          color='inherit'
          noWrap
          className={classes.title}
        >
          Menus
        </Typography>
        <RouterLink to='/'>
          <Link className={classes.link}>
            <Typography component='h1' variant='h5' color='inherit' noWrap>
              Home
            </Typography>
          </Link>
        </RouterLink>
        {authContext.isAuthenticated ? dashboardLink : null}
        <RouterLink to='/auth/signin'>
          <Link className={classes.link}>
            <Typography component='h1' variant='h5' color='inherit' noWrap>
              Sign in
            </Typography>
            <ExitToAppIcon />
          </Link>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}
