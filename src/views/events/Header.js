import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const navItems = ["Home", "Schedule", "Sponsors", "Speakers"];

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    
      <AppBar component="div" style={{ background: "#F1F1F1" }} elevation={0}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "3px 20px", // Adjusted padding
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              sx={{ height: 54 }}
              alt="Logo"
              src={"/dummy-logo.png"}
            />

            <Box>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#033333" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

    
  );
};



export default Header;
