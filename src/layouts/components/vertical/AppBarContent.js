// ** MUI Imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Menu from "mdi-material-ui/Menu";
import Magnify from "mdi-material-ui/Magnify";

// ** Components
import ModeToggler from "src/@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown";
import NotificationDropdown from "src/@core/layouts/components/shared-components/NotificationDropdown";
import { useState, Fragment, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  attendeesData,
  event,
  eventID,
  registrationData,
  speakerData,
  sponsorData
} from "src/store/slice/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "src/constants";
import Cookies from "js-cookie";
import router from "next/router";

const AppBarContent = (props) => {
  const dispatch = useDispatch();
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // ** Hook
  const hiddenSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [eventList, setEventList] = useState("");

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const userId = useSelector((state) => state.auth.user?.userData?.data?.id);


  const eventData = useSelector((state) => state.event?.eventData?.data);



  const handleChange = (e) => {
    const selectedEventId = e.target.value;
    setEventList(e.target.value);
    dispatch(speakerData(null))
    dispatch(sponsorData(null))
    dispatch(attendeesData(null))
    dispatch(registrationData(null))
    router.push('/')
    // storing event id  to use while in add speaker , sponsor form  to send event id
    dispatch(eventID(e.target.value))
      // Send a POST request with the selected event ID
     
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        <IconButton
          color="inherit"
          onClick={toggleNavVisibility}
          sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
        >
          <Menu />

          <FormControl
            fullWidth
            sx={{
              padding: "0",
              marginLeft: "2em",
              width: 400,
            }}
          >
            <InputLabel id="demo-simple-select-label">Event List</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={eventList}
              label="Event List"
              onChange={handleChange}
            >
              {Array.isArray(eventData) &&
                eventData.map((event) => (
                  <MenuItem key={event.event_id} value={event.event_id}>
                    {event.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </IconButton>

        {/*  hide search bar */}
        {/* <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        /> */}
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
