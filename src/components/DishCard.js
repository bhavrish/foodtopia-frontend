import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import AuthContext from '../context/auth/authContext';
import CustomerContext from '../context/customer/customerContext';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: '45px',
    height: '45px',
    lineHeight: '45px',
    borderRadius: '50%',
    textAlign: 'center',
    background: theme.palette.primary.main,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function DishCard(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const customerContext = useContext(CustomerContext);

  const { isAuthenticated } = authContext;
  const { addToCart } = customerContext;

  const history = useHistory();

  const changeRoute = () => {
    if (isAuthenticated) {
      addToCart(props.menuItem);
      history.push('/customer/cart');
    } else {
      history.push('/auth/signin');
    }
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageSrc}
          title={props.title}
        />
        <CardContent>
          <div className={classes.flexBox}>
            <Typography gutterBottom variant='h5' component='h2'>
              {props.title} - ${props.price}
            </Typography>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              className={classes.circle}
            >
              {props.rate}
            </Typography>
          </div>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <Button
          onClick={changeRoute}
          variant='contained'
          size='small'
          color='primary'
        >
          Order
          <ShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
