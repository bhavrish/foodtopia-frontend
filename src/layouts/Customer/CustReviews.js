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
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Compliment</MenuItem>
                <MenuItem onClick={handleClose}>Complaint</MenuItem>
            </Menu>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Review To Id"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              multiline
              id="name"
              label="Review"
              type="email"
              fullWidth
            />
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
            <FormCol />
        </Grid>
        <Grid container item direction='column' xs={6} spacing={5}>
            <FormCol />
        </Grid>
        </Grid>
      </div>

    );
    
}