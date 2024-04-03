import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const TicketBooking = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const handleTabChange = (event, newValue) => {
    // Prevent tab switching when clicking on tabs directly
    event.preventDefault();
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
              Person Details
            </Typography>
            <form>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormDataChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormDataChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormDataChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleFormDataChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </form>
          </Container>
        );
      case 1:
        return (
          <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
              Ticket
            </Typography>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
            {/* Your ticket form or information */}
          </Container>
        );
      case 2:
        return (
          <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
              Ticket
            </Typography>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
            {/* Your ticket form or information */}
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #ccc",
            "& .MuiTab-root": {
              borderRight: "1px solid #ccc",
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#2196f3",
              color: "white",
            },
          }}
        >
          <Tab disabled label="Person Details" />
          <Tab disabled label="Ticket" />
          <Tab disabled label="Success" />
        </Tabs>
      </AppBar>
      {renderContent()}
    </>
  );
};

export default TicketBooking;
