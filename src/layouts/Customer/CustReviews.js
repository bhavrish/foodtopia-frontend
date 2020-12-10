import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReviewCard} from '../../components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ReviewsContext from '../../context/reviews/reviewsContext';
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
  }));

export default function CustReviews(props) {
    const classes = useStyles();

    /*const [review, setReview] = useState({
      review: '',
      reviewFrom: '',
      reviewTo: '',
      starRating: 5,
      type: '',
    });*/
    const reviewsContext = useContext(ReviewsContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const { getReviews, reviews } = reviewsContext;

    useEffect(() => {
      if (user) {
        getReviews(user._id);
        //postReview();
      }
      // eslint-disable-next-line
    }, [user]);

    /*function FormCol() {
        return (
            <React.Fragment>
              {reviews.map((review) => (
                <Grid key = {review._id} item xs={4}>
                  <ReviewCard
                    review={review.review}
                    reviewFrom={review.reviewFrom}
                    type={review.type}
                    rating={review.rating}
                  />
                </Grid>
              ))}
                <Grid item xs={4}>
                    <ReviewCard />
                </Grid>
                <Grid item xs={4}>
                    <ReviewCard />
                </Grid>
            </React.Fragment>
        );
    }*/
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(2);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Write a review
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your review below. We appreciate your feedback!
            </DialogContentText>
            
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Review Type
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose2}
            >
                <MenuItem onClick={handleClose2}>Compliment</MenuItem>
                <MenuItem onClick={handleClose2}>Complaint</MenuItem>
            </Menu>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="name"
              label="Review To Id"
              type="email"
              fullWidth
            />
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              multiline
              id="name"
              label="Review"
              type="email"
              fullWidth
            />

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
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
                  <ReviewCard
                    review={review.review}
                    reviewFrom={review.reviewFrom}
                    type={review.type}
                    rating={review.rating}
                  />
                </Grid>
            ))}        
          </Grid>
      
        </Grid>
      </div>

    );
    
}
/*
        return (
            <div>
            <div className={classes.appBarSpacer} />
            <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
                <Grid container item xs={12} spacing={3}>
                {reviews.map((review) => (
                    <Grid key={review._id} item xs={4}>
                    <ReviewCard
                        src={`http://localhost:5000/api/reviews/`}
                        type={review.type}
                        reviewFrom={review.reviewFrom}
                        reviewTo={review.reviewTo}
                        review={review.review}
                    />
                    </Grid>
                ))}
                </Grid>
            </Grid>
            </div>
        );
        */