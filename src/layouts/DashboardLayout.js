import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DashboardNav} from '../components';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

export default function DashboardLayout(props) {
    const classes = useStyles();

    return(
        <div style={{display:'flex'}}>
            <DashboardNav listItems={props.listItems} userName={props.userName}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {props.routes}
                </Container>
            </main>
        </div>
    );
}