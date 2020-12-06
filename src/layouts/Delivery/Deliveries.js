import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {TaskCard} from '../../components';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Deliveries(props) {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <TaskCard />
                </Grid>
                <Grid item xs={4}>
                    <TaskCard />
                </Grid>
                <Grid item xs={4}>
                    <TaskCard />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
                <FormRow />
            </Grid>
            <Grid container item xs={12} spacing={5}>
                <FormRow />
            </Grid>
        </Grid>
    );
}