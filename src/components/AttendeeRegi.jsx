import { Tab } from "mdi-material-ui";
import React, { useState } from "react";
import { Tabs } from "react-bootstrap";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";

const AttendeeRegi = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1); // Move to the next tab
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "8rem",
        marginTop: "3rem",
      }}
    >
      <div className="tabdiv" style={{ width: "40%" }}>
        <Tabs
          id="justify-tab-example"
          className="mb-3"
          justify
          style={{ minWidth: 200 }}
          activeKey={activeTab}
          onSelect={() => { }}
        >
          <Tab eventKey={0} title="Personal Details" />
          <Tab eventKey={1} title="Ticket" />
          <Tab eventKey={2} title="Success" />
        </Tabs>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          border: "1px solid #C9C9C9",
          background: "white !important",
          borderRadius:"5px"
        }}
      >
        {activeTab === 0 && (
          <Box sx={{ padding: "2rem 5rem" }}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    margin="normal"
                  />
                </Grid>
               

 

              </Grid>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    background: "#0E436B",
                    borderRadius: "40px",
                    color: "white",
                    marginTop: "2rem",
                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </form>
          </Box>
        )}

        {activeTab === 1 && (
          <div
            style={{
              display: "flex",
              background: "#white",
              border: "1px solid #DEDEDE",
              alignItems: "flex-start",
              gap: "20px",
              padding: "1rem 2rem"
            }}
          >
            <div style={{ width: "50%", borderRadius: "10px", background: "#F2F2F2" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem"
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>
                  Ticket Price
                </span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>
                  Number of Person
                </span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>
                  Sub Total
                </span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>Ticket</span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>
                  Discount
                </span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>Fees</span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "30%", marginLeft: "1rem" }}>Tax</span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <span
                  style={{
                    width: "30%",
                    marginLeft: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  Total amount payable
                </span>
                <input
                  className="inputfield"
                  type="text"
                  style={{ borderRadius: "5px", padding: "6px 32px" }}
                />
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div style={{ padding:"1rem", borderRadius: "10px", background: "#F2F2F2" }}>
                Payment
                <div style={{ margin: "1rem 2rem" }}>
                  <input type="radio" /> Credit Card
                </div>
                <div style={{ margin: "1rem 2rem" }}>
                  <input type="radio" /> Other Payment Methods
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: "flex-end", marginTop: "4rem" }}>
                <Button sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }} variant="contained" color="primary" onClick={handleNext}>
                  Make Payment
                </Button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 2 && (
          <div>
            <div style={{textAlign:'center' , padding:"1rem"}}>
              <img src="/Group_2550.svg" alt="congoimage" />
              <h2 style={{font:"24px",color:"#0E436B"}}>You have successfully registered for the event.</h2>
            </div>
            <div style={{display:"flex", width:"100%",justifyContent:"space-around",paddingTop:"3rem", alignItems:"center"}}>
              <div>
                Category: <input style={{width:"60%",background:' #F1F1F1 0% 0% no-repeat padding-box' , borderRadius:"5px"}} className="inpotfeild" type="text"/>
              </div>
              <div>
                Amount Paid: <input style={{ width:"60%",background:' #F1F1F1 0% 0% no-repeat padding-box' , borderRadius:"5px"}} type="text"/>
              </div>
              <div>
                Registration Id: <input style={ { width:"60%",background:' #F1F1F1 0% 0% no-repeat padding-box' , borderRadius:"5px"}} type="text"/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:"5rem", padding:"4rem 0rem",alignItems:"center"}}>
            <Button sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }} variant="contained" color="primary" onClick={handleNext}>
                  Download Receipt
                </Button>
            <Button sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }} variant="contained" color="primary" onClick={handleNext}>
                 Download Ticket
                </Button>
            <Button sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }} variant="contained" color="primary" onClick={handleNext}>
                 Download Badges
                </Button>
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeRegi;
