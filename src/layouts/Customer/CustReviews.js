import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard} from '../../components';


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

export default function CustReviews(props) {
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