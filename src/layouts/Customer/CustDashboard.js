import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {DishCard} from '../../components';
import Typography from '@material-ui/core/Typography';
import HomeImg from '../HomeImg.jpg';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function CustDashboard(props) {
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
        <Grid container spacing={3}>
            <div>
                <h1> Recommended </h1>
                <Grid container item xs={12} spacing={5}>
                    <FormRow />
                </Grid>
            </div>
            <br/>
            <div>
                <h1> Special Dishes </h1>
                <Grid container item xs={12} spacing={5}>
                    <FormRow />
                </Grid>
            </div>
        </Grid>
    );
}