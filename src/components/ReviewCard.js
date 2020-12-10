import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 550,
    minHeight: 250,
    background: theme.palette.textBackground.main,
  },
  red: {
    background: theme.palette.buttonColor1.main,
    marginRight: theme.spacing(2)
  },
  green: {
    background: theme.palette.buttonColor2.main,
    marginRight: theme.spacing(2)
  }
}));

export default function ReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.reviewType}
        </Typography>
        <Typography variant="h7" component="h6">
          Review To
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.reviewTo} ({props.reviewToType})
        </Typography>
        <Typography variant="h7" component="h6">
          Review From
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.reviewFrom} ({props.reviewFromType})
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
            <Button className={classes.green} size="small" minWidth='50px'>Valid</Button>
            <Button className={classes.red} size="small" minWidth='50px'>Invalid</Button>
        </Box>
      </CardContent>
    </Card>
  );
}