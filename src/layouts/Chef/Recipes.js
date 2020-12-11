import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CartCard } from '../../components';
import CreateRecipes from './CreateRecipe';

import ChefContext from '../../context/chef/chefContext';
import AuthContext from '../../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  addRecipeBtn: {
    float: 'right',
  },
}));

export default function Recipes(props) {
  const classes = useStyles();

  const chefContext = useContext(ChefContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { getRecipes, recipes } = chefContext;

  useEffect(() => {
    if (user) {
      getRecipes(user._id);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <CreateRecipes />
      <Grid container direction='column' spacing={2}>
        {recipes.map((recipe) => (
          <Grid key={recipe._id} item xs={10}>
            <CartCard
              imageSrc={`http://localhost:5000/api/menuItems/images/${recipe.image}`}
              title={recipe.title}
              price={recipe.price}
              rate={recipe.starRating}
              chefName={recipe.chefName}
              description={recipe.description}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
