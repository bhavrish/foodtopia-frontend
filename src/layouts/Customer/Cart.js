import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CartCard} from '../../components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summary: {
        minWidth: 500,
        height: 600,
        background: theme.palette.primary.main,
    },
  }));

export default function Cart(props) {
    const classes = useStyles();

    function FormCol() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <CartCard />
                </Grid>
                <Grid item xs={4}>
                    <CartCard />
                </Grid>
                <Grid item xs={4}>
                    <CartCard />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <div className={classes.root}>
            <Grid container direction='column' item xs={6} spacing={2}>
                <FormCol />
            </Grid>
            <Card className={classes.summary}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}