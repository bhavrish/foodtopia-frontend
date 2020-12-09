import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import theme from '../theme'
import ManagerContext from '../context/manager/managerContext';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 550,
    minHeight: 200,
    background: theme.palette.textBackground.main
  },
  red: {
    background: theme.palette.buttonColor1.main,
  },
  green: {
    background: theme.palette.buttonColor2.main,
  }
}));

export default function ApproveCard(props) {
  const classes = useStyles();

  const managerContext = useContext(ManagerContext);
  const { hireEmployee, declineEmployee } = managerContext;

  const onApprove = () => {
    hireEmployee(props.id);
  };

  const onDecline = () => {
    declineEmployee(props.id);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h7" component="h6">
          Name
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.name}
        </Typography>
        <Typography variant="h7" component="h6">
          Email
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.email}
        </Typography>
        <Typography variant="h7" component="h6">
          User Type
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {props.type}
        </Typography>
        <br/>
        <Box display="flex" justifyContent="flex-end">
          <ButtonGroup className={classes.buttonContainer} variant="contained" aria-label="button group">
            <Button className={classes.green} size="small" onClick={onApprove}>Approve</Button>
            <Button color="Primary" size="small" onClick={onDecline}>Decline</Button>
            <Button className={classes.red} size="small">Ban</Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}