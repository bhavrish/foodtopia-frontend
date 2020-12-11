import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard2} from '../../components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CustomerContext from '../../context/customer/customerContext';
import AuthContext from '../../context/auth/authContext';


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
      postReviewBtn: {
        float: 'right',
      },
  }));

export default function CustReviews(props) {
    const classes = useStyles();


    const customerContext = useContext(CustomerContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const { reviews, getReviews, postReview } = customerContext;

    useEffect(() => {
      if (user) {
        getReviews(user._id);
        //postReview();
      }
      // eslint-disable-next-line
    }, [user]);

    const [open, setOpen] = React.useState(false);
    const [review, setReview] = useState({
      type: '',
      reviewFrom: '',
      reviewTo: '',
      review: '',
      starRating: 5,
    });

    //const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(2);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      console.log(review);
      postReview({
        type: review.type,
        reviewFrom: user._id,
        reviewFromType: 'customer',
        reviewTo: review.reviewTo,
        reviewToType: review.reviewToType,
        review: review.review,
        starRating: review.starRating,

      });
    };

    /*const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose2 = () => {
        setAnchorEl(null);
    };*/

    const onChange = (e) => {
      setReview({ ...review, [e.target.name]: e.target.value });
      console.log (review);
    }
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.postReviewBtn}>
          Write a review
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Write a Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your review below. We appreciate your feedback!
            </DialogContentText>
            
            <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel htmlFor='outlined-userType-native-simple'>
              Review Type*
            </InputLabel>
            <Select
              native
              onChange={onChange}
              required
              label='Review Type'
              inputProps={{
                name: 'type',
                id: 'type',
              }}
            >
              <option aria-label='None' value='' />
              <option value='compliment'>Compliment</option>
              <option value='complaint'>Complaint</option>
            </Select>
            </FormControl>

            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="reviewTo"
              name="reviewTo"
              label="Review To ID"
              type="email"
              fullWidth
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              multiline
              id="review"
              name="review"
              label="Review"
              type="email"
              fullWidth
              onChange={onChange}
            />

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue, onChange) => {
                setValue(newValue);
              }}
            />
          </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <div></div>
        <Grid container spacing={3}>
          <Grid container direction='column' item xs={6} spacing={5}>
            {reviews.map((review) => (
                <Grid key = {review._id} item xs={4}>
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
      </div>
    );
}