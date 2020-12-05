import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { OutlinedInput } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alerts/alertContext';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Restaurant App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { signin, isAuthenticated, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push(`/${userType}/dashboard`);
    }

    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, userType, props.history]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (event) => {
    const target = event.target;
    switch (target.name) {
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      case 'userType':
        setUserType(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '' || userType === '') {
      setAlert('Please fill in all the fields', 'error');
    } else {
      signin(email, password, userType);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onInput={handleInput}
            error={emailRegex.test(email) || email === '' ? false : true}
          />

          <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password*
            </InputLabel>
            <OutlinedInput
              required
              name='password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              onInput={handleInput}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>

          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel htmlFor='outlined-userType-native-simple'>
              User Type*
            </InputLabel>
            <Select
              native
              onInput={handleInput}
              required
              label='User Type'
              inputProps={{
                name: 'userType',
                id: 'outlined-userType-native-simple',
              }}
            >
              <option aria-label='None' value='' />
              <option value='customer'>Customer</option>
              <option value='chef'>Chef</option>
              <option value='delivery'>Delivery</option>
              <option value='manager'>Manager</option>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <RouterLink to='/auth/signup'>
                <Link variant='body2'>{"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
