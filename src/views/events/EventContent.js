









import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const navItems = ["Home", "Schedule", "Sponsors", "Speakers"];

const EventContent = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
<Box>

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 45px", // Adjusted padding
    margin: "0 auto",
    width: "80%",
    //   flexGrow: 0.5,
  }}
  component="div"
>
  {/* Simplified the styling for the three boxes */}
  <Box
    component="div"
    sx={{
      ...boxStyles,
      height: 260,
      width: 265,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      component="img"
      sx={{ height: 80, width: 150 }}
      alt="Logo"
      src={"/dummy-logo.png"}
    />
  </Box>

  <Box
    component="div"
    sx={{
      ...boxStyles,
      height: 260,
      width: 215,
      backgroundColor: "#C3E5DE",
      display:'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingLeft:10,
      paddingRight:10
    }}
  >
<Box sx={{ display:'flex',
      justifyContent: "center",
      alignItems: "center",backgroundColor:'#fff',borderRadius:40,width:80,height:80}}>
<Box
      component="img"
      sx={{ height: 40, width: 45 }}
      alt="Logo"
      src={"/reminder_time.png"}
    />
    </Box>



<Typography
      style={{ color: "#033333", fontSize: 12,fontWeight:500  }}
    >
      Event Date
    </Typography>
    <Typography
      style={{ color: "#0E436B", fontSize: 18, fontWeight: 600 }}
    >
     10 Jan -25 Jan
    </Typography>
    <Typography
      style={{ color: "#0E436B", fontSize: 12, fontWeight: 600 }}
    >
     10.00 AM to 4.00 PM
    </Typography>
    <Typography
      style={{ color: "#0E436B", fontSize: 22, fontWeight: 600 }}
    >
      2024
    </Typography>
      
  </Box>

  <Box
    component="div"
    sx={{
      ...boxStyles,
      height: 260,
      width: 500,
      backgroundColor: "#EFF8FF",
      padding: 10,
    }}
  >
    <Typography
      style={{ color: "#0E436B", fontSize: 18, fontWeight: 600 }}
    >
      SimulCare Symposium 2024
    </Typography>
    <Typography style={{ color: "#454545", fontSize: 14 }}>
      Experience healthcare innovation at SimulCare Symposium 2024! Join
      leading experts for hands-on simulations, discussions, and insights
      into the future of medical training. Explore cutting-edge
      technologies shaping the industry and elevate your understanding of
      simulated healthcare scenarios. Uncover the next frontier in patient
      care with us!
    </Typography>
  </Box>
</Box>

<Box
  component="div"
  sx={{
    backgroundColor: "#0E436B",
    width: 200,
    borderRadius: 40,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto",
  }}
>
  <Typography style={{ color: "#fff" }} variant="p">
    Register
  </Typography>
</Box>

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 45px", // Adjusted padding
    margin: "20px auto",
    width: "80%",
    marginTop: 10,
    //   flexGrow: 0.5,
  }}
>
  {/* Adjusted the backgroundImage property */}
  <Box
    component="div"
    sx={{
      borderRadius: 2,
      display: "flex",
      backgroundImage: "url(/Group_2597.png)",
      backgroundSize: "cover",
      justifyContent: "center",
      alignItems: "center",
      height: 220,
      width: "30%",
    }}
  >
    <Box component="div" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box component="img" alt="Logo" src={"/staff.png"} />
      <Typography style={{ color: "#fff",marginTop:10,fontSize:20,fontWeight:600 }} variant="p">
      Committee /Staff
  </Typography>
    </Box>
  </Box>
  <Box
    component="div"
    sx={{
      borderRadius: 2,
      display: "flex",
      backgroundImage: "url(/Group_2598.png)",
      backgroundSize: "cover",
      justifyContent: "center",
      alignItems: "center",
      height: 220,
      width: "30%",
    }}
  >
    <Box component="div" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box component="img" alt="Logo" src={"/sponsar.png"} />
      <Typography style={{ color: "#fff",marginTop:10,fontSize:20,fontWeight:600  }} variant="p">
      Sponsor
  </Typography>
    </Box>
  </Box>
  <Box
    component="div"
    sx={{
      borderRadius: 2,
      display: "flex",
      backgroundImage: "url(/Group_2599.png)",
      backgroundSize: "cover",
      justifyContent: "center",
      alignItems: "center",
      height: 220,
      width: "30%",
    }}
  >
    <Box component="div"  sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box
        component="img"
        sx={{ height: 80, width: 150 }}
        alt="Logo"
        src={"/people.png"}
      />
      <Typography style={{ color: "#fff",marginTop:10,fontSize:20,fontWeight:600  }} variant="p">
      Attendee
  </Typography>
    </Box>
  </Box>
</Box>
</Box>

  )

}

const boxStyles = {
    borderRadius: 2,
    border: "1px solid #C9C9C9",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
  };
  

export default EventContent;