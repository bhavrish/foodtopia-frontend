import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100%',
        background: theme.palette.primary.main,
    },
  }));

export default function ManagDiscussion(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
        </div>
    );
}