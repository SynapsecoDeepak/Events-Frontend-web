import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const index = () => {
  return (
    <>
      <Typography
        sx={{ color: "#0E436B", fontSize: "30px", fontWeight: "700" }}
      >
        session
      </Typography>

      <Card>
        <CardContent>
          <Typography  sx={{ color: "#0E446C",  fontSize: "24px", fontWeight: "700" }} variant="h6" gutterBottom>
            Session 1 Title come here
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            <CalendarMonthIcon /> 2024-04-05 , 10:00 AM
          </Typography>
          <hr />
          <Typography variant="body1" gutterBottom>
            Description:
          </Typography>
          <TextField multiline rows={4} placeholder="Description about the session" variant="outlined" fullWidth />
          <Typography variant="body1" gutterBottom>
            Tags:
          </Typography>
          <TextField placeholder="Tag 1, Tag 2, Tag 3, Tag 4" variant="outlined" fullWidth />
          <Button sx={{marginTop:"2rem" , padding:"1rem 4rem" , borderRadius:"50px", backgroundColor:"#0E436B"}} variant="contained">
            Save
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default index;
