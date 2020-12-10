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
import AuthContext from '../context/auth/authContext';
import ChefContext from '../context/chef/chefContext';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
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
    display: "flex",
    justifyContent: "flex-end",
  }
}));

export default function TaskCard(props) {
  const classes = useStyles();
  
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const chefContext = useContext(ChefContext);
  const { cookOrder } = chefContext;


  const onDone = () => {
    if (user) {
      cookOrder({
        chefID: user._id,
        orderID: props.id,
      });
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
            <div useStyles={{flexDirection:'column', }}>
              <Typography variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography gutterBottom variant="h8" component="h5">
                Order From: {props.orderFrom}
              </Typography>
            </div>
          </div>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
            Dietary restrictions: {props.restrictions == null ? 'none' : props.restrictions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <Button variant="contained" size="small" color="primary" onClick={onDone}>
          Cook
          <DoneIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}