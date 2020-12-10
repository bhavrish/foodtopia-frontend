import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 550,
    minHeight: 250,
    background: theme.palette.textBackground.main,
  },
}));

export default function ReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.type}
        </Typography>
        <Typography variant="h7" component="h6">
          Review From
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.reviewFrom}
        </Typography>
        <Typography variant="h7" component="h6">
          Review
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.review}
        </Typography>
        <br/>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating name="review-rating" value={props.rating} readOnly />
        </Box>
      </CardContent>
    </Card>
  );
}