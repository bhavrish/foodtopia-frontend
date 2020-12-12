import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundSquare: {
    width: '45px',
    height: '45px',
    lineHeight: '45px',
    borderRadius: '25%',
    textAlign: 'center',
    background: theme.palette.primary.main,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function CustomerOrder(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div className={classes.flexBox}>
            <div useStyles={{ flexDirection: 'column' }}>
              <Typography variant='h5' component='h2'>
                {props.title}
              </Typography>
            </div>
          </div>
          <br />
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.description}
          </Typography>
          <br />
          <Typography variant='body2' color='textSecondary' component='p'>
            Chef: {props.chef == null ? 'none' : props.chef}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Delivery Person:{' '}
            {props.deliveryPerson == null ? 'none' : props.deliveryPerson}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Status: {props.status == null ? 'none' : props.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
