

import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './home.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        bk: {
            // light: will be calculated from palette.primary.main,
            main: 'rgb(3, 43, 145)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        }
    },
  });


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
                        <ThemeProvider theme={theme}>
                            <Button  sx={{color: 'white'}}classes='but' variant="contained" href="/signup" color="bk">
                                Sign Up
                            </Button>
                            <Button classes='but' variant="contained" href="/login" color='primary'>
                                Login
                            </Button>
                            
                        </ThemeProvider>

                    </Stack>
            </div>
        );
    }
}



// export default withStyles(useStyles, { withTheme: true })(Home);
export default (Home);