import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ReceiptCard} from '../../components';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function Receipts(props) {
    const classes = useStyles();

    function FormCol() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <ReceiptCard />
                </Grid>
                <Grid item xs={4}>
                    <ReceiptCard />
                </Grid>
                <Grid item xs={4}>
                    <ReceiptCard />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <div>
            <Grid container direction='column' item xs={6} spacing={2}>
                <FormCol />
            </Grid>
        </div>
    );
}