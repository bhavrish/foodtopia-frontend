import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  media: {
    width: 600,
    height: 200,
  },
  content: {
    display: 'flex',
  },
  TextField: {
    width: 20,
  },
}));

export default function CartCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.imageSrc}
        title={props.title}
      />
      <CardContent>
        <div className={classes.content}>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.title} - ${props.price}
          </Typography>
        </div>
        <Typography variant='body2' color='textSecondary' component='p'>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
