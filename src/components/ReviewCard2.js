import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import CustomerContext from '../context/customer/customerContext';
import ChefContext from '../context/chef/chefContext';
import DeliveryContext from '../context/delivery/deliveryContext';
import AuthContext from '../context/auth/authContext';



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 550,
    minHeight: 250,
    background: theme.palette.textBackground.main,
  },
  red: {
    background: theme.palette.buttonColor1.main,
    marginRight: theme.spacing(2)
  }
}));

export default function ReviewCard2(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { typeOfUser, user } = authContext;

  const deliveryContext = useContext(DeliveryContext);
  const { deliveryDisputeReview } = deliveryContext;

  const customerContext = useContext(CustomerContext);
  const { customerDisputeReview } = customerContext;

  const chefContext = useContext(ChefContext);
  const { chefDisputeReview } = chefContext;
  

  const onDeliveryDispute = () => {
    deliveryDisputeReview(props.id);
  };

  const onCustomerDispute = () => {
    customerDisputeReview(props.id);
  };

  const onChefDispute = () => {
    chefDisputeReview(props.id);
  };


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.reviewType}
        </Typography>

        <Typography variant="h7" component="h6">
          Review
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.reviewMessage}
        </Typography>
        <br/>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating name="review-rating" value={props.rating} readOnly />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {typeOfUser === 'delivery' ? 
            <Button className={classes.red} size="small" minWidth='50px' onClick={onDeliveryDispute}>Dispute</Button>
            : null}
          {typeOfUser === 'customer' ? 
            <Button className={classes.red} size="small" minWidth='50px' onClick={onCustomerDispute}>Dispute</Button>
            : null}

          {typeOfUser === 'chef' ? 
            <Button className={classes.red} size="small" minWidth='50px' onClick={onChefDispute}>Dispute</Button>
            : null}

        </Box>

      </CardContent>
    </Card>
  );
}