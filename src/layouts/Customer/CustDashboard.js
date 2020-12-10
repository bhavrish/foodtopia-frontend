import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DishCard } from '../../components';
import Typography from '@material-ui/core/Typography';
import HomeImg from '../HomeImg.jpg';

import AuthContext from '../../context/auth/authContext';
import CustomerContext from '../../context/customer/customerContext';

const useStyles = makeStyles((theme) => ({}));

export default function CustDashboard(props) {
  const classes = useStyles();

  const customerContext = useContext(CustomerContext);
  const authContext = useContext(AuthContext);

  const { recommendedDishes, getRecommendedDishes } = customerContext;
  const { user } = authContext;

  useEffect(() => {
    if (user) {
      getRecommendedDishes(user._id);
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <Grid container spacing={3}>
      <div>
        <h1> Recommended </h1>
        <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
          <Grid container item xs={12} spacing={3}>
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
      <br />
      <div>
        <h1> Special Dishes </h1>
        <Grid container item xs={12} spacing={5}></Grid>
      </div>
    </Grid>
  );
}
