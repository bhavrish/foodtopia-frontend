import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard} from '../../components';
import Typography from '@material-ui/core/Typography';

import ManagerContext from '../../context/manager/managerContext';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function ManagDashboard(props) {
    const classes = useStyles();

    const managerContext = useContext(ManagerContext);

    const { reviews, getReviews } = managerContext;

    useEffect(() => {
        getReviews();

        // eslint-disable-next-line
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
            {reviews.map((review) => (
                <Grid key={review._id} item xs={6}>
                    <ReviewCard
                        id={review._id}
                        reviewType={review.type}
                        reviewTo={review.reviewTo}
                        reviewToType={review.reviewToType}
                        reviewFrom={review.reviewFrom}
                        reviewFromType={review.reviewFromType}
                        reviewMessage={review.review}
                        rating={review.starRating}
                    />
                </Grid>
            ))}
            </Grid>
        </Grid>
    );
}