import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Nav, DishCard } from '../components';

import MenuItemsContext from '../context/menuItems/menuItemsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  const { menuItems, getMenuItems } = menuItemsContext;

  useEffect(() => {
    getMenuItems();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div className={classes.appBarSpacer} />
      <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
        <Grid container item xs={12} spacing={3}>
          {menuItems.map((menuItem) => (
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
