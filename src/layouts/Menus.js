import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Nav, DishCard} from '../components';
import HomeImg from './HomeImg.jpg';

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
        marginTop: "20px",
    },
}));


export default function Menus() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <DishCard 
                        imageSrc={HomeImg}
                        title='Dish Title' 
                        price='100'
                        rate='2.5'
                        description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica'
                    />
                </Grid>
                <Grid item xs={4}>
                    <DishCard 
                        imageSrc={HomeImg}
                        title='Dish Title' 
                        price='100'
                        rate='2.5'
                        description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica'
                    />
                </Grid>
                <Grid item xs={4}>
                    <DishCard 
                        imageSrc={HomeImg}
                        title='Dish Title' 
                        price='100'
                        rate='2.5'
                        description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica'
                    />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <div>
            <Nav />
            <div className={classes.appBarSpacer} />
            <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    );
}