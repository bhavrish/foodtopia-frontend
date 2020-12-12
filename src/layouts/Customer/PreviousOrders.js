import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CustomerOrder } from '../../components';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../../context/auth/authContext';
import CustomerContext from '../../context/customer/customerContext';

const useStyles = makeStyles((theme) => ({}));

export default function PreviousOrders(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const customerContext = useContext(CustomerContext);

  const { orders, getOrders } = customerContext;

  useEffect(() => {
    console.log('test');
    if (user) getOrders(user._id);
    // console.log(user._id);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} spacing={2}>
        {orders &&
          orders
            .slice(0)
            .reverse()
            .map((order) => (
              <Grid key={order._id} item xs={4}>
                <CustomerOrder
                  id={order._id}
                  type='chef'
                  title={order.title}
                  imageSrc={`http://localhost:5000/api/menuItems/images/${order.image}`}
                  description={order.description}
                  chef={order.chef}
                  delivery={order.deliveryPerson}
                  status={order.status}
                  orderFrom={order.customer}
                />
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
}
