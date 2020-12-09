import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CartCard } from '../../components';
import Typography from '@material-ui/core/Typography';
import CreateRecipes from './CreateRecipe';

const useStyles = makeStyles((theme) => ({
  addRecipeBtn: {
    float: 'right',
  },
}));

export default function Recipes(props) {
  const classes = useStyles();

  return (
    <div>
      <CreateRecipes />
      <Grid container direction='column' spacing={2}>
        <Grid item xs={10}>
          <CartCard
            imageSrc={`http://localhost:5000/api/menuItems/images/9c274b8b6f59da73d6c973195919748f.jpeg`}
            title='Avacado Breakfast Bowl'
            price='8.79'
            chefName='Steve Rogers'
            description='Heart health and protein in a bowl! This recipe is an unexpected kick of flavor with egg, red quinoa, avocado, and feta cheese! Very easy to make and a delicious start to the day'
          />
        </Grid>
        <Grid item xs={10}>
          <CartCard
            imageSrc={`http://localhost:5000/api/menuItems/images/9c274b8b6f59da73d6c973195919748f.jpeg`}
            title='Avacado Breakfast Bowl'
            price='8.79'
            chefName='Steve Rogers'
            description='Heart health and protein in a bowl! This recipe is an unexpected kick of flavor with egg, red quinoa, avocado, and feta cheese! Very easy to make and a delicious start to the day'
          />
        </Grid>
        <Grid item xs={10}>
          <CartCard
            imageSrc={`http://localhost:5000/api/menuItems/images/9c274b8b6f59da73d6c973195919748f.jpeg`}
            title='Avacado Breakfast Bowl'
            price='8.79'
            chefName='Steve Rogers'
            description='Heart health and protein in a bowl! This recipe is an unexpected kick of flavor with egg, red quinoa, avocado, and feta cheese! Very easy to make and a delicious start to the day'
          />
        </Grid>
      </Grid>
    </div>
  );
}
