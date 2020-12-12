import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { DishCard } from '../../components';
import Typography from '@material-ui/core/Typography';

import AuthContext from '../../context/auth/authContext';
import CustomerContext from '../../context/customer/customerContext';
import MenuItemsContext from '../../context/menuItems/menuItemsContext';
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router-dom';

import PreviousOrders from './PreviousOrders';

const useStyles = makeStyles((theme) => ({
  btn: {
    height: 55,
    padding: theme.spacing(2),
  },
}));

export default function CustDashboard(props) {
  const classes = useStyles();

  const customerContext = useContext(CustomerContext);
  const authContext = useContext(AuthContext);
  const menuItemsContext = useContext(MenuItemsContext);

  const {
    recommendedDishes,
    getRecommendedDishes,
    addBalance,
    newBalance,
  } = customerContext;
  const { user, setUserBalance, signout } = authContext;
  const {
    menuItems,
    getMenuItems,
    filterSpecialDishes,
    specialDishes,
  } = menuItemsContext;

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      getRecommendedDishes(user._id);
    }

    if (menuItems.length === 0) {
      getMenuItems();
    }

    if (user && user.isVIP) {
      filterSpecialDishes();
    }

    // eslint-disable-next-line
  }, [user, menuItems]);

  // if blacklisted user, log out user
  if (user && user.isBlacklisted) {
    signout();
    return <Redirect to='/' />;
  }

  const onAddBtnClick = () => {
    addBalance(balance, user._id);

    setUserBalance(parseFloat(user.balance + balance));
  };

  const onAddBtnChange = (e) => {
    setBalance(e.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid container item spacing={2} direction='column'>
        <Typography variant='h6' component='h6'>
          Warnings - {user && user.warnings}
        </Typography>
        <Typography variant='h6' component='h6'>
          Current Balance - $ {user && user.balance.toFixed(2)}
        </Typography>
      </Grid>

      <Grid container item spacing={2} direction='row'>
        <Grid item xs={11}>
          <TextField
            fullWidth
            variant='outlined'
            name='balance'
            id='balance'
            onChange={onAddBtnChange}
            label='Enter Amount to add to balance'
          />
        </Grid>
        <Grid item>
          <Button
            onClick={onAddBtnClick}
            variant='contained'
            color='primary'
            className={classes.btn}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <div>
        <br />

        {recommendedDishes.length > 0 ? (
          <Typography variant='h6' component='h6'>
            &nbsp; Recommended Dishes
          </Typography>
        ) : null}
        <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
          <Grid container item xs={12} spacing={2}>
            {recommendedDishes.map((recommendedDish) => (
              <Grid key={recommendedDish._id} item xs={4}>
                <DishCard
                  imageSrc={`http://localhost:5000/api/menuItems/images/${recommendedDish.image}`}
                  title={recommendedDish.title}
                  price={recommendedDish.price}
                  rate={recommendedDish.starRating}
                  chefName={recommendedDish.chefName}
                  description={recommendedDish.description}
                  menuItem={recommendedDish}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>

      <div>
        <br />
        <br />
        {user && user.isVIP ? (
          <Typography variant='h6' component='h6'>
            Special Dishes
          </Typography>
        ) : null}
        <Grid container item xs={12} spacing={2}>
          {specialDishes &&
            specialDishes.map((specialDish) => (
              <Grid key={specialDish._id} item xs={4}>
                <DishCard
                  imageSrc={`http://localhost:5000/api/menuItems/images/${specialDish.image}`}
                  title={specialDish.title}
                  price={specialDish.price}
                  rate={specialDish.starRating}
                  chefName={specialDish.chefName}
                  description={specialDish.description}
                  menuItem={specialDish}
                />
              </Grid>
            ))}
        </Grid>
      </div>
      <br />
      <br />
      <div>
        <Typography variant='h6' component='h6'>
          Previous Orders
        </Typography>
        <PreviousOrders />
      </div>
    </Grid>
  );
}
