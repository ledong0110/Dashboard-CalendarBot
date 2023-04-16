import React, { useEffect, useState } from "react";
import NarrowGroupList from "../../components/NarrowGroupList/narrowGroupList";
import { useDispatch, useSelector } from "react-redux";
import myTheme from "../../themes/themes";
import {
  makeStyles,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import our_api from "../../utils/requests";
import {
  selectCalendarStatus,
  setCalendarStatus,
  setCalendarAuthUrl,
  selectCalendarAuthUrl,
} from "../../reducers/calendarSlice";
import { selectEmail, selectUserType } from "../../reducers/navbarSlice";
import { selectToken } from "../../reducers/authSlice";
import { selectCompanyMembers } from "../../reducers/teamSlice";
import Dropzone from "react-dropzone";
import './setting.css'

//our_api.allMembersNotBelongToAnyCompany;

//our_api.addMembersToMyCompany;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: myTheme.spacing(20),
    margin: "auto",
  },
  card: {
    height: "60vh",
    minWidth: 690,
    padding: 30,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  autoComplete: {
    width: "25vw",
    minWidth: 250,
    marginBottom: 30,
    marginTop: 50,
  },
  topMargin: {
    margin: 20,
  },
  a: {
    width: 350,
    height: 250,
    border: "5px dashed #bbbbbb",
    "&:hover": {
      backgroundColor: "#ff0000",
    },
  },
  hover: {
    backgroundColor: "#00ff00",
    width: 350,
    height: 250,
    border: "5px dashed #bbbbbb",
  },
}));

const theme = createTheme({
  palette: {
      bk: {
          // light: will be calculated from palette.primary.main,
          main: 'rgb(20, 136, 219)',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
      }
  },
});

const SettingsPage = () => {
  const classes = useStyles();
  const [telegram, setTelegram] = useState("")
  const calendarStatus = useSelector(selectCalendarStatus);
  const calendarAuthUrl = useSelector(selectCalendarAuthUrl);
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  const userType = useSelector(selectUserType);

  const dispatch = useDispatch();

  const [value, setValue] = React.useState({ tags: [] });
  const [allMembersToAddCompany, setAllMembersToAddCompany] = useState([]);
  const [file, setFile] = useState("yok");

  const handleCalendarAuth = () => {
    window.location.href = calendarAuthUrl;
  };

  const onTagsChange = (event, values) => {
    setValue({ tags: values });
    console.log("values:", values);
    console.log("value", value);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0] !== undefined) {
      if (acceptedFiles[0].size > 5242880) {
        console.log("SIZEEE", acceptedFiles[0].size);
        setFile("yok");
        alert(
          "Dosya boyutu 5MB'tan büyük, lütfen daha küçük bir dosya yükleyiniz."
        );
      } else {
        alert("Dosyanız alındı!");
        console.log(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
      }
    } else {
      alert(
        "Dosya formatı yanlış, lütfen .json formatında bir dosya tercih ediniz."
      );
      setFile("yok");
    }
  };

  useEffect(() => {
    our_api
      .getUrlForGoogleButton(token)
      .then((res) => {
        console.log("RESSS", res.data.data);
        dispatch(setCalendarAuthUrl(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });

    our_api
      .allMembersNotBelongToAnyCompany(token)
      .then((res) => {
        console.log("RESSS", res.data.data);
        setAllMembersToAddCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    our_api
      .checkInfo(token)
      .then((res) => {
        console.log(res.data)
        setTelegram(res.data.telegramUsername)
        dispatch(setCalendarStatus(res.data.authenticated))
      })
  }, [token]);

  return (
    <div className="cover">
      <div className='container'>
        <ThemeProvider theme={theme}>
          <div className='google'>
            <h2 className="text">Reauthenticate with your calendar</h2>
            <Button
                sx={{color: 'white'}}
                variant="contained"
                color="bk"
                onClick={handleCalendarAuth}
                disabled={calendarAuthUrl === "" ? true : false}
            >
                {calendarStatus ? "Reauthenticate Google Calendar":"Authenticate Google Calendar"}
            </Button>
            <h5 style={{marginBottom: '0.2rem '}}>
                {" "}
                {calendarAuthUrl === ""
                ? "there is a problem, you cannot authenticate right now."
                : ""}{" "}
            </h5>
            <h3>
                calendar auth status:{" "}
                {calendarStatus ? "AUTHENTICATED" : "NOT AUTHENTICATED"}{" "}
            </h3>
          </div>
          <div className='google'>
            <h2 className="text">Please leave your telegram username</h2>
            <Stack spacing={0.5} direction="column">
              <TextField id="telegram" label="Your Telegram username" variant="outlined" value={telegram} onChange={(e) => setTelegram(e.target.value)}/>
              <Button
                  sx={{color: 'white'}}
                  variant="contained"
                  color="bk"
                  onClick={() =>
                    our_api.postTelegramUsername(token, telegram).then((res) => {
                        console.log("tele sub ", res.data.msg)
                    })
                  }
              >
              Submit
              </Button>
            </Stack>
          </div>
        </ThemeProvider>
      </div>

    </div>
  );
};

export default SettingsPage;
