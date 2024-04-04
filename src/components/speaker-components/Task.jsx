import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Task = ({ taskdemoData }) => {
  const handleCheckboxChange = (event) => {
    // Handle checkbox change here
  };

  // Define button color and font color based on task status
  const getButtonStyle = () => {
    let backgroundColor, color;
    if (taskdemoData.status === "Overdue") {
      backgroundColor = "#FF1313"; 
      color = "#ffffff"; 
    } else if (taskdemoData.status === "Approved") {
      backgroundColor = "#5EAF41"; 
      color = "#ffffff"; 
    } 
    return { backgroundColor, color };
  };

  return (
    <Card sx={{ marginTop: "2rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Left Box */}
          <Grid item xs={8}>
            <Button
            style={{borderRadius:"5px"}}
              variant="contained"
              size="small"
              sx={getButtonStyle()}
            >
              {taskdemoData.status}
            </Button>
            <Typography
              sx={{ color: "#0E446C", fontSize: "24px", fontWeight: "700" }}
              variant="h6"
              gutterBottom
            >
              {taskdemoData.heading}
            </Typography>
            <Typography
              sx={{ color: "black", fontWeight: "400" }}
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
            >
              <CalendarMonthIcon /> {taskdemoData.date} - {taskdemoData.time}
            </Typography>
            <div>
              <Typography variant="body2">{taskdemoData.desc}</Typography>
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
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      borderRadius: 4,
                    },
                  }}
                />
              }
              label="Mark Completed"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Task;
