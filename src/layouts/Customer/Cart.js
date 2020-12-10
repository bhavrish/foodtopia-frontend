import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CartCard } from '../../components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import CustomerContext from '../../context/customer/customerContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    background: theme.palette.primary.main,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Cart(props) {
  const classes = useStyles();

  const customerContext = useContext(CustomerContext);
  const { itemsInCart } = customerContext;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} spacing={2}>
          {itemsInCart.map((itemInCart) => (
            <Grid item xs={12} className={classes.card}>
              <CartCard
                imageSrc={`http://localhost:5000/api/menuItems/images/${itemInCart.image}`}
                title={itemInCart.title}
                price={itemInCart.price}
                chefName={itemInCart.chefName}
                description={itemInCart.description}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardContent>
                <Typography variant='h5'>SUMMARY</Typography>
                <br />
                <Divider />
                <br />

                <Typography variant='h6'>Subtotal</Typography>
                <Typography variant='h6'>Tax</Typography>
                <Typography variant='h6'>Delivery</Typography>

                <br />
                <Divider />
                <br />
                <Typography variant='h5'>TOTAL</Typography>

                <br />
                <Button fullWidth variant='contained' color='primary'>
                  Place Order
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
