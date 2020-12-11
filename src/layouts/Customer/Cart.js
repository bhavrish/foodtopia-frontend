import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CartCard } from '../../components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  const [needDelivery, setneedDelivery] = useState(true);

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

  const handleNeedDelivery = (e) => {
    setneedDelivery(e.target.checked);

    if (!needDelivery) {
      setDeliveryCharge(itemsInCart.length * 0.25);
    } else {
      setDeliveryCharge(0);
    }
  };

  const calculateSubTotal = () => {
    let price;
    if (user && user.isVIP) {
      price = itemsInCart.reduce((sum, item) => sum + item.price * 0.9, 0); // 10% discount for VIP cust
    } else {
      price = itemsInCart.reduce((sum, item) => sum + item.price, 0);
    }

    setSubTotal(price);
  };

  const calculateItemPrice = (item) => {
    return user.isVIP ? item.price * 0.9 : item.price;
  };

  const placeOrder = () => {
    for (const item of itemsInCart) {
      const itemPrice = calculateItemPrice(item);

      createOrder(
        {
          menuItemID: item._id,
          customerID: user._id,
          deliveryNeeded: needDelivery,
          price: needDelivery ? itemPrice + 0.5 : itemPrice + 0.25, // add 0.25 for delivery & 0.25 for tax per item conditionally
        },
        user.balance
      );

      if (error) {
        setAlert(error, 'error');
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

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={needDelivery}
                      onChange={handleNeedDelivery}
                      name='needDelivery'
                      color='primary'
                    />
                  }
                  label='Need it delivered?'
                />

                <Typography variant='h6'>
                  Subtotal - {subTotal.toFixed(2)}
                </Typography>
                <Typography variant='h6'>
                  Tax - {itemsInCart.length * 0.25}
                </Typography>

                {needDelivery ? (
                  <Typography variant='h6'>
                    Delivery - {itemsInCart.length * 0.25}
                  </Typography>
                ) : null}

                <br />
                <Divider />
                <br />
                <Typography variant='h5'>
                  TOTAL - {(subTotal + tax + deliveryCharge).toFixed(2)}
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
