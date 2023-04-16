

import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Stack from '@mui/material/Stack';
import './home.css'


const useStyles = theme => ({
    root: {

    }

})


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
        // const { classes } = this.props;
        // const classes = useStyles();
        const isAuth = this.handleAuth();

        if (!isAuth) {
            return <Redirect to={{ pathname: "/signin" }} />;
        }
        return (
            <div className='wrapper'>
                <h1>HCMUT Professional Skill For Engineer Calendar Chatbot</h1>
                <img className='img' src="/bachkhoa.png" width='375px' height='375px'/>
                    <Stack spacing={10} direction="row">
                        <Button classes='but' variant="contained" href="/signup" color="primary">
                            Sign Up
                        </Button>
                        <Button classes='but' variant="contained" href="/login" color='secondary'>
                            Login
                        </Button>
                    </Stack>
            </div>
        );
    }
}



// export default withStyles(useStyles, { withTheme: true })(Home);
export default (Home);