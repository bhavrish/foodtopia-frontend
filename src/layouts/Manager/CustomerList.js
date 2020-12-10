import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ApproveCard} from '../../components';

import ManagerContext from '../../context/manager/managerContext';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function CustomerList(props) {
    const classes = useStyles();

    const managerContext = useContext(ManagerContext);

    const { customers, getPendingCustomers } = managerContext;

    useEffect(() => {
        getPendingCustomers();

        // eslint-disable-next-line
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
            {customers.map((customer) => (
                <Grid key={customer._id} item xs={6}>
                    <ApproveCard
                        id={customer._id}
                        name={customer.firstName + " " + customer.lastName}
                        email={customer.email}
                        type={'customer'}
                    />
                </Grid>
            ))}
            </Grid>
        </Grid>
    );
}