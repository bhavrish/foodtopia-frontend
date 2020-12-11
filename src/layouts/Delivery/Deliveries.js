import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {TaskCard} from '../../components';
import Typography from '@material-ui/core/Typography';

import DeliveryContext from '../../context/delivery/deliveryContext';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Deliveries(props) {
    const classes = useStyles();

    const deliveryContext = useContext(DeliveryContext);

    const { orders, getOrders } = deliveryContext;

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
            {orders.map((order) => (
                <Grid key={order._id} item xs={4}>
                    <TaskCard
                        id={order._id}
                        type="delivery"
                        title={order.title}
                        imageSrc={`http://localhost:5000/api/menuItems/images/${order.image}`}
                        description={order.description}
                        restrictions={order.restrictions}
                        orderFrom={order.customer}
                    />
                </Grid>
            ))}
            </Grid>
        </Grid>
    );
}