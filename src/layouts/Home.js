import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink } from 'react-router-dom';
import HomeImg from './HomeImg.jpg';

const useStyles = makeStyles((theme) => ({
    media: {
        height: "100vh",
    },
    container: {
        width: "auto",
        paddingTop: "30vh",
        paddingLeft: "20vh",
        display: "flex",
        flexDirection: "column",
        color: "#FFF",
    },
    margin: {
        margin: theme.spacing(2, 3, 2, 0),
        width: "200px",
    },
    buttonColor: {
        display: "flex",
        alignItems: "center",
        color: "#fff",
    }
}));


export default function Home() {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            <CardMedia
                className={classes.media}
                image={HomeImg}
            >
                <main className={classes.container}>
                    <Typography component="h1" variant="h1" color="inherit" noWrap>
                        FOODTOPIA
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        We make ordering and enjoying food easy
                    </Typography>
                    <div useStyles={{ flexDirection: "row" }}>
                        <Button variant="contained" color="primary" component={RouterLink} to="/menus" className={classes.margin}>
                            <Typography component="h1" variant="h6" noWrap>
                                I'm Hungry
                            </Typography>
                        </Button>
                        <Button variant="outlined" color="primary" component={RouterLink} to="/auth/signin" className={classes.margin}>
                            <Typography component="h1" variant="h6" noWrap className={classes.buttonColor}>
                                Sign In
                                <ExitToAppIcon />
                            </Typography>
                        </Button>
                    </div>
                </main>
            </CardMedia>
        </div>
    );
}