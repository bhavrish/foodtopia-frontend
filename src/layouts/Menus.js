import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Nav, DishCard } from '../components';

import MenuItemsContext from '../context/menuItems/menuItemsContext';
import AuthContext from '../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  SearchContainer: {
    padding: '5px 100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
  inputFocused: {
    border: '2px solid theme.palette.primary.main',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBarSpacer: {
    marginTop: '20px',
  },
}));

export default function Menus() {
  const classes = useStyles();

  const menuItemsContext = useContext(MenuItemsContext);
  const authContext = useContext(AuthContext);

  const text = useRef('');

  const {
    menuItems,
    getMenuItems,
    searchMenuItems,
    filtered,
    clearSearch,
  } = menuItemsContext;
  const { user } = authContext;

  useEffect(() => {
    if (user) {
      getMenuItems(user.isVIP);
    } else {
      getMenuItems(false);
    }

    if (filtered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line
  }, [user]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      console.log(e.target.value);
      searchMenuItems(e.target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
      <Nav />
      <Paper elevation={0} component='form' className={classes.SearchContainer}>
        <input
          className={classes.input}
          classes={{ focused: classes.inputFocused }}
          variant='outlined'
          placeholder='Search Menu...'
          ref={text}
          type='text'
          onChange={onChange}
        />
      </Paper>
      <div className={classes.appBarSpacer} />
      <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
        <Grid container item xs={12} spacing={3}>
          {filtered !== null
            ? filtered.map((menuItem) => (
                <Grid key={menuItem._id} item xs={4}>
                  <DishCard
                    imageSrc={`http://localhost:5000/api/menuItems/images/${menuItem.image}`}
                    title={menuItem.title}
                    price={menuItem.price}
                    rate={menuItem.starRating}
                    chefName={menuItem.chefName}
                    description={menuItem.description}
                    menuItem={menuItem}
                  />
                </Grid>
              ))
            : menuItems.map((menuItem) => (
                <Grid key={menuItem._id} item xs={4}>
                  <DishCard
                    imageSrc={`http://localhost:5000/api/menuItems/images/${menuItem.image}`}
                    title={menuItem.title}
                    price={menuItem.price}
                    rate={menuItem.starRating}
                    chefName={menuItem.chefName}
                    description={menuItem.description}
                    menuItem={menuItem}
                  />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </div>
  );
}
