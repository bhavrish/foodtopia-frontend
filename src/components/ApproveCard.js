import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../theme'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 550,
    minHeight: 200,
    background: "F6F6F6"
  },
}));

export default function ApproveCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Name
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Mace Windu
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Email
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          mwindu@jediacademy.org
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          UserType
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Delivery Person
        </Typography>
        <Button variant="contained" size="small" color="92Bf6B">
          Approve
        </Button>
        <Button variant="contained" size="small" color="primary">
          Decline
        </Button>
        <Button variant="contained" size="small" color="EC8C6D">
          Ban
        </Button>
      </CardContent>
    </Card>
  );
}