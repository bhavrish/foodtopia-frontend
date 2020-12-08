import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ApproveCard} from '../../components';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function EmployeeList(props) {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={6}>
                    <ApproveCard />
                </Grid>
                <Grid item xs={6}>
                    <ApproveCard />
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