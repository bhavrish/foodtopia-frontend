import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DishCard } from '../../components';
import Typography from '@material-ui/core/Typography';

import AuthContext from '../../context/auth/authContext';
import CustomerContext from '../../context/customer/customerContext';
import MenuItemsContext from '../../context/menuItems/menuItemsContext';

const useStyles = makeStyles((theme) => ({}));

export default function CustDashboard(props) {
  const classes = useStyles();

  const customerContext = useContext(CustomerContext);
  const authContext = useContext(AuthContext);
  const menuItemsContext = useContext(MenuItemsContext);

  const { recommendedDishes, getRecommendedDishes } = customerContext;
  const { user } = authContext;
  const {
    menuItems,
    getMenuItems,
    filterSpecialDishes,
    specialDishes,
  } = menuItemsContext;

  useEffect(() => {
    if (user) {
      getRecommendedDishes(user._id);
    }

    if (menuItems.length === 0) {
      console.log('IN IF MENUITEMS');
      getMenuItems();
    }

    if (user && user.isVIP) {
      filterSpecialDishes();
    }

    // eslint-disable-next-line
  }, [user, menuItems]);

  console.log(specialDishes);
  return (
    <Grid container spacing={3}>
      <div>
        {recommendedDishes.length > 0 ? (
          <Typography variant='h6' component='h6'>
            Recommended Dishes
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
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>

      <div>
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
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </Grid>
  );
}
