import { Box, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import RecentActivities from "src/views/tables/RecentActivities";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PendingTasksCard from "./PendingTask";

const Home = () => {
  return (
    <Box>
      <Box>
        <Typography
          sx={{ fontSize: "30px", color: "#0E436B", marginBottom: "1rem" }}
        >
          Event Name
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "2rem",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Box sx={{ width: "50%", display:"flex",gap:"2rem" , flexDirection:"column" }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                {/* Upper Box */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {/* Left Box with Image */}
                    <Grid item xs={4}>
                      <CardMedia
                        sx={{
                          border: "1px solid #D1D1D1",
                          borderRadius: "10px",
                        }}
                        component="img"
                        height="194"
                        image="/dummy-logo.png"
                        alt="logoimage"
                      />
                    </Grid>
                    {/* Right Box with Text */}
                    <Grid item xs={8}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#0E446C",
                          fontSize: "24px",
                          fontWeight: "800",
                        }}
                      >
                        Spark Innovation Summit
                      </Typography>

                      <Box sx={{ color: "#333333", fontsize: "1rem" , display:"flex" , flexDirection:"column" ,gap:"1rem" }}>
                        <Typography>
                          {" "}
                          <CalendarMonthIcon />
                          Date: March 25, 2024
                        </Typography>
                        <Typography>
                          {" "}
                          <AccessTimeIcon /> Time: 9:00 AM - 5:00 PM
                        </Typography>
                        <Typography>
                          <LocationOnIcon />
                          InnoTech Hub, 123 Innovation Avenue Tech City
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Lower Box with Text */}
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "14px", color: "black" }}
                  >
                    Join us for the Spark Innovation Summit, where thought
                    leaders, industry experts, and innovators will come together
                    to explore the latest trends and advancements in technology
                    and business.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <PendingTasksCard/>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Card>
            <CardHeader
              title="Recents Activities"
              titleTypographyProps={{ variant: "h6" }}
              className="dashboard-title"
              sx={{ color: "primary.main" }}
            />
            <RecentActivities />
          </Card>
        </Box>




      </Box>
    </Box>
  );
};

export default Home;
