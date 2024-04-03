import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DashboardTable from "../speaker/Table";
import EventTable from "./EventTable";

const drawerWidth = 240;
const navItems = ["Home", "Schedule", "Sponsors", "Speakers"];

const EventDetails = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const recentActivity = [
    {
      unit: "PM",
      time: "12.50",
      name: "Sam added a speaker for ABC Event",
    },
    {
      unit: "PM",
      time: "12.50",
      name: "Sam added a speaker for ABC Event",
    },
    {
      unit: "PM",
      time: "12.50",
      name: "Sam added a speaker for ABC Event",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "690px",
            // height: '304px',
            /* UI Properties */
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "0px 0px 6px #00000029",
            borderRadius: "10px",
            padding: "25px",
            // display: 'flex',
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #D1D1D1",
                borderRadius: "10px",
                width: "125px",
                height: "125px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "95px",
                  height: "55px",
                }}
                src={"/dummy-logo.png"}
              />
            </Box>

            <Box
              sx={{
                marginLeft: "20px",
                width: "250px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Spark Innovation Summit</Typography>
              <Typography
                variant="p"
                style={{ fontSize: 12, color: "#333333", marginTop: 10 }}
              >
                Date: March 25, 2024
              </Typography>
              <Typography
                variant="p"
                style={{ fontSize: 12, color: "#333333", marginTop: 4 }}
              >
                Time: 9:00 AM - 5:00 PM
              </Typography>
              <Typography
                variant="p"
                style={{ fontSize: 12, color: "#333333", marginTop: 4 }}
              >
                InnoTech Hub, 123 Innovation Avenue Tech City, State 12345
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="div"
              style={{ fontSize: 10, color: "#333333", lineHeight: 0.5 }}
            >
              Join us for the Spark Innovation Summit, where thought leaders,
              industry experts, and innovators will come together to explore the
              latest trends and advancements in technology and business.
            </Typography>
          </Box>
        </Box>
        <Box sx={{}}>
      
          <EventTable />
        </Box>
      </Box>

      <Box
        sx={{
          width: "400px",
          // height: "500px",
          /* UI Properties */
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 0px 6px #00000029",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <Typography variant="h6" className="primary-dash-title" style={{marginBottom:25,fontSize:20}}>
          Recent Activities
        </Typography>

        {recentActivity?.map(({ unit, name, time }) => (
          <Box sx={{ display: "flex",marginBottom:5, borderBottom: "1px solid #00000029",paddingBottom:5, }}>
            <Box
              sx={{
                width: "65px",
                height: "65px",
                /* UI Properties */
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #D1D1D1",
                borderRadius: "10px",
                display: "flex",
                justifyContent:'center',
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h8" style={{fontSize:14}} className="primary-dash-title">
                {unit}
              </Typography>
              <Typography
                variant="p"
                style={{ color: "#2BACE2",fontSize:14 }}
              >
                {time}
              </Typography>
            </Box>

            <Box>
            <Typography
                variant="p"
                style={{ fontSize:14,color:'#0E446C',marginLeft:15 }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const boxStyles = {
  borderRadius: 2,
  border: "1px solid #C9C9C9",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
};

export default EventDetails;
