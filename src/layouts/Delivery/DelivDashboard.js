import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard} from '../../components';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function DelivDashboard(props) {
    const classes = useStyles();

    function FormCol() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <ReviewCard />
                </Grid>
                <Grid item xs={4}>
                    <ReviewCard />
                </Grid>
                <Grid item xs={4}>
                    <ReviewCard />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <Grid container spacing={3}>
            <Grid container direction='column' item xs={6} spacing={5}>
                <FormCol />
            </Grid>
            <Grid container item direction='column' xs={6} spacing={5}>
                <FormCol />
            </Grid>
        </Grid>
    );
}