import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '30px',
        color: theme.palette.textColor.main,
    },
    userIcon: {
        padding: '10px',
    },
  }));

export default function DashboardNav(props) {
    const classes = useStyles();
    const [page, setPage] = useState("Dashboard");

    return (
        <div>
            <CssBaseline/>
            <AppBar position="absolute" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {page}
                    </Typography>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Hello User!
                    </Typography>
                    <RouterLink to='/'>
                        <Link className={classes.link}>
                            <Typography component="h1" variant="h6" color="inherit" noWrap>
                                Sign Out
                            </Typography>
                            <ExitToAppIcon />
                        </Link>
                    </RouterLink>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.userIcon}>
                    <FaceIcon style={{ fontSize: 60 }}/>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {props.userName}
                    </Typography>
                </div>
                <Divider />
                <List>
                    <props.listItems display={setPage}/>
                </List>
            </Drawer>
        </div>
    );
}