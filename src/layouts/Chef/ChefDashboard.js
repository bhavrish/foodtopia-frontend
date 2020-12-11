import React, { useContext, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard2} from '../../components';
import Typography from '@material-ui/core/Typography';

import ChefContext from '../../context/chef/chefContext';
import AuthContext from '../../context/auth/authContext';


const useStyles = makeStyles((theme) => ({
    
  }));

export default function ChefDashboard(props) {
    const classes = useStyles();

    const chefContext = useContext(ChefContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const { reviews, getReviews } = chefContext;

    useEffect(() => {
        if (user) {
          getReviews(user._id);
          //disputeReview();
        }
        // eslint-disable-next-line
      }, [user]);

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
            {reviews.map((review) => (
                <Grid key={review._id} item xs={6}>
                    <ReviewCard2
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