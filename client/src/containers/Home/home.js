

import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


class Home extends Component {

    constructor(props) {

        super(props);
        this.handleAuth = this.handleAuth.bind(this);

    }
    handleAuth() {
        let token = localStorage.getItem("token");

        return token !== undefined;
    }


    render() {
        const classes = useStyles();
        const isAuth = this.handleAuth();

        if (!isAuth) {
            return <Redirect to={{ pathname: "/signin" }} />;
        }
        return (
            <div className={classes.root}>

                <img className={classes.avatar} src="/bachkhoa.png" width={500} height={500}/>
                <Button className={classes.submit} variant="contained" href="/signup" color="primary">
                    Sign Up
                </Button>
                <Button className={classes.submit} variant="contained" href="/login" color="secondary">
                    Login
                </Button>
            </div>
        );
    }
}



export default withStyles(useStyles, { withTheme: true })(Home);