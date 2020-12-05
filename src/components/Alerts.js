import React, { useContext } from 'react';
import AlertContext from '../context/alerts/alertContext';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const classes = useStyles();
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div className={classes.root}>
        <Alert severity={alert.type}>{alert.msg}</Alert>
      </div>
    ))
  );
};

export default Alerts;
