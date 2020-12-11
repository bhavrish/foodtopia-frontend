import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CartCard } from '../../components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import AuthContext from '../../context/auth/authContext';
import CustomerContext from '../../context/customer/customerContext';
import AlertContext from '../../context/alerts/alertContext';

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

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const customerContext = useContext(CustomerContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { itemsInCart, createOrder, error, clearError } = customerContext;
  const { user, subtractUserBalance } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    calculateSubTotal();
    setDeliveryCharge(itemsInCart.length * 0.25); // $0.25 delivery charge per item
    setTax(itemsInCart.length * 0.25); // $0.25 tax per item
  }, []);

  const calculateSubTotal = () => {
    let price;
    if (user && user.isVIP) {
      price = itemsInCart.reduce((sum, item) => sum + item.price * 0.9, 0); // 10% discount for VIP cust
    } else {
      price = itemsInCart.reduce((sum, item) => sum + item.price, 0);
    }

    setSubTotal(price);
  };

  const placeOrder = () => {
    for (const item of itemsInCart) {
      createOrder(
        {
          menuItemID: item._id,
          customerID: user._id,
          deliveryNeeded: true,
          price: item.price + tax + deliveryCharge,
        },
        user.balance
      );

      if (error) {
        setAlert(error, 'error');
        clearError();
      } else {
        subtractUserBalance(subTotal + tax + deliveryCharge);
      }
    }

    setSubTotal(0);
    setDeliveryCharge(0);
    setTax(0);
  };

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

                <Typography variant='h6'>Subtotal - {subTotal}</Typography>
                <Typography variant='h6'>
                  Tax - {itemsInCart.length * 0.25}
                </Typography>
                <Typography variant='h6'>
                  Delivery - {itemsInCart.length * 0.25}
                </Typography>

                <br />
                <Divider />
                <br />
                <Typography variant='h5'>
                  TOTAL - {subTotal + tax + deliveryCharge}
                </Typography>

                <br />
                <Button
                  onClick={placeOrder}
                  fullWidth
                  variant='contained'
                  color='primary'
                >
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
