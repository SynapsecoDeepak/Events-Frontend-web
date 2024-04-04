import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SpeakerSession = ({ sessionData }) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/speakerSession/editSession");
  };
  return (
    <Card sx={{ marginTop: "2rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Left Box */}
          <Grid item xs={8}>
            <Typography
              sx={{ color: "#0E446C",  fontSize: "24px", fontWeight: "700" }}
              variant="h6"
              gutterBottom
            >
              {sessionData.heading}
            </Typography>
            <Typography sx={{ color: "black",   fontWeight: "400" }} variant="subtitle1" color="textSecondary" gutterBottom>
            <CalendarMonthIcon/>  {sessionData.date} - {sessionData.time}
            </Typography>
            <div>
              {sessionData.tags.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  display="inline"
                  style={{ marginRight: 8 , padding:"0.2rem 0.5rem ", border:"1px solid #D1D1D1" ,borderRadius:"4px"}}
                >
                  {tag}
                </Typography>
              ))}
            </div>
          </Grid>
          {/* Right Box */}
          <Grid
            item
            xs={4}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              onClick={handleRoute}
              variant="contained"
              sx={{ color: "white", padding: "0.5rem 1.5rem" }}
            >
              <EditIcon />
              Edit Session
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SpeakerSession;
