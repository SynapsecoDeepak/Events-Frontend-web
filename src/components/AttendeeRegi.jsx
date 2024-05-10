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
  MenuItem,
} from "@mui/material";
import { BASE_URL } from "src/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AttendeeRegi = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const eventIDByQueryID = useSelector((state) => state?.event?.eventIDByQuery);
  const eventPublicData = useSelector(
    (state) => state?.event?.eventPublicData?.ticket_types
  );

  const [selectedTicket, setSelectedTicket] = useState(eventPublicData[0]);

  const handleTicketChange = (e) => {
    const selectedType = parseInt(e.target.value);
    const selected = eventPublicData.find(
      (ticket) => ticket.ticket_type_id === selectedType
    );

    setSelectedTicket(selected);

    // Update related fields in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      ticketType: selected.type,
      ticketPrice: selected.price,
      discount: selected.discount,
      fees: selected.fees,
      tax: selected.tax,
    }));
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    organization: "",
    designation: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    foodPreference: "",
    ticketType: "",
    ticketPrice: selectedTicket.price,
    noOFPerson: "",
    subTotal: "",
    discount: selectedTicket.discount,
    fees: selectedTicket.fees,
    tax: selectedTicket.tax,
    totalAmountPayable: "",
  });

  const handleInputChange = (prop) => (event) => {
    if (prop === "noOFPerson") {
      const numberOfPersons = event.target.value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [prop]: numberOfPersons,
        subTotal: calculateTotalAmount(numberOfPersons),
      }));
    } else {
      setFormData({ ...formData, [prop]: event.target.value });
    }
  };

  const calculateTotalAmount = (numberOfPersons) => {
    const ticketPrice = parseFloat(selectedTicket.price);
    return numberOfPersons * ticketPrice;
  };

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Email is empty or has an invalid format.");
      return; // Prevent further execution
    }
    if (!formData.firstName || formData.firstName == "") {
      toast.error("Enter your name");
      return; // Prevent further execution
    }

    setActiveTab(activeTab + 1); // Move to the next tab
  };

  const handleSubmit = async (event) => {
    // dispatch(eventPublicData(null));

    event.preventDefault();

    if (!formData.noOFPerson || formData.noOFPerson === "0") {
      toast.error("Number of persons must be at least 1");

      return;
    }

    const formDataToSend = {
      user: {
        email: formData.email,
        name: formData.firstName,
        last_name:formData.lastName,
        tc: true, // Assuming this is a checkbox for terms and conditions
        user_type: "Attendee",
        county_of_residence: formData.country,
        designation: formData.designation,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipcode: parseInt(formData.zipCode),
        bio: "", // You can populate this from your form data if available
        linkdin: formData.linkedInLink,
        twitter: formData.twitterLink,
        website: formData.personalWebsite,
        organization_name: formData.organization,
        contact: formData.contact,
      },
      event_id: eventIDByQueryID,
      ticket: {
        ticket_type: formData.ticketType,
        ticket_price: parseFloat(formData.ticketPrice), // Convert to number if necessary
        no_of_attendees: parseInt(formData.noOFPerson), // Convert to number if necessary
        discount: parseFloat(formData.discount), // Convert to number if necessary
        fees: parseFloat(formData.fees), // Convert to number if necessary
        tax: parseFloat(formData.tax), // Convert to number if necessary
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/user/attendee_registration/`,
        formDataToSend
      );
      if (!response.data.status) {
        toast.error("Attendee already registered for this event.");
        return;
      }
      toast.success("Attendee Register Successfully");
      setActiveTab(activeTab + 1); // Move to the next tab
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "8rem",
        marginTop: "3rem",
        background: "white !important",
      }}
    >
      <div className="tabdiv" style={{ width: "40%" }}>
        <Tabs
          id="justify-tab-example"
          className="mb-3"
          justify
          style={{ minWidth: 200 }}
          activeKey={activeTab}
          onSelect={() => {}}
        >
          <Tab eventKey={0} title="Personal Details" />
          <Tab eventKey={1} title="Ticket" />
          <Tab eventKey={2} title="Success" />
        </Tabs>
      </div>

      <div
        style={{
          backgroundColor: "white !important",
          width: "100%",
          maxWidth: 1000,
          border: "1px solid #C9C9C9",
          borderRadius: "5px",
        }}
      >
        {activeTab === 0 && (
          <Box sx={{ padding: "2rem 5rem", background: "white" }}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  First Name
                  <TextField
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Last Name
                  <TextField
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Email
                  <TextField
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Contact
                  <TextField
                    id="contact"
                    type="number"
                    min="0"
                    value={formData.contact}
                    onChange={handleInputChange("contact")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Organization
                  <TextField
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleInputChange("organization")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Designation
                  <TextField
                    id="designation"
                    value={formData.designation}
                    onChange={handleInputChange("designation")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Address
                  <TextField
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Country
                  <TextField
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange("country")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  State
                  <TextField
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange("state")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  City
                  <TextField
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange("city")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  Zip Code
                  <TextField
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange("zipCode")}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  Food Preference
                  <TextField
                    name="foodPreference"
                    value={formData.foodPreference}
                    onChange={handleInputChange("foodPreference")}
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
              padding: "1rem 2rem",
            }}
          >
            <div
              style={{
                width: "50%",
                borderRadius: "10px",
                background: "#F2F2F2",
                padding: "1rem 2rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                <label
                  style={{ width: "30%", marginLeft: "1rem" }}
                  htmlFor="ticketType"
                >
                  Ticket Type
                </label>

                <select
                  id="ticketType"
                  className="inputfield"
                  onChange={handleTicketChange}
                >
                  {eventPublicData.map((ticket) => (
                    <option
                      key={ticket.ticket_type_id}
                      value={ticket.ticket_type_id}
                    >
                      {ticket.type}
                    </option>
                  ))}
                </select>

                {/* <TextField
                  id="ticketType"
                  className="inputfield"
                  value={formData.ticketType}
                  onChange={handleInputChange("ticketType")}
                  margin="normal"
                /> */}

                {/* 

<label htmlFor="ticketType">Select Ticket Type:</label>
<select id="ticketType" onChange={handleTicketChange}>
          {ticketData.map(ticket => (
<option key={ticket.ticket_type_id} value={ticket.ticket_type_id}>{ticket.type}</option>
          ))}
</select>

*/}
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
                <TextField
                  type="number"
                  id="noOFPerson"
                  className="inputfield"
                  value={formData.noOFPerson}
                  onChange={handleInputChange("noOFPerson")}
                  margin="normal"
                  inputProps={{ min: "0" }}
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
                  Ticket Price
                </span>
                <TextField
                  disabled
                  id="ticketPrice"
                  className="inputfield"
                  value={formData.ticketPrice}
                  onChange={handleInputChange("ticketPrice")}
                  margin="normal"
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
                <TextField
                  disabled
                  id="subTotal"
                  className="inputfield"
                  value={formData.subTotal}
                  onChange={handleInputChange("subTotal")}
                  margin="normal"
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
                <TextField
                  disabled
                  id="discount"
                  className="inputfield"
                  value={formData.discount}
                  onChange={handleInputChange("discount")}
                  margin="normal"
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
                <TextField
                  disabled
                  id="fees"
                  className="inputfield"
                  value={formData.fees}
                  onChange={handleInputChange("fees")}
                  margin="normal"
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
                <TextField
                  disabled
                  id="tax"
                  className="inputfield"
                  value={formData.tax}
                  onChange={handleInputChange("tax")}
                  margin="normal"
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
                <TextField
                  disabled
                  id="totalAmountPayable"
                  className="inputfield"
                  value={formData.totalAmountPayable}
                  onChange={handleInputChange("totalAmountPayable")}
                  margin="normal"
                />
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: "#F2F2F2",
                }}
              >
                Payment
                <div style={{ margin: "1rem 2rem" }}>
                  <input type="radio" /> Credit Card
                </div>
                <div style={{ margin: "1rem 2rem" }}>
                  <input type="radio" /> Other Payment Methods
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "4rem",
                }}
              >
                <Button
                  sx={{
                    background: "#0E436B",
                    borderRadius: "40px",
                    color: "white",
                    marginTop: "2rem",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <img src="/Group_2550.svg" alt="congoimage" />
              <h2 style={{ font: "24px", color: "#0E436B" }}>
                You have successfully registered for the event.
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                paddingTop: "3rem",
                alignItems: "center",
              }}
            >
              <div>
                Category:{" "}
                <input
                  style={{
                    width: "60%",
                    background: " #F1F1F1 0% 0% no-repeat padding-box",
                    borderRadius: "5px",
                  }}
                  className="inpotfeild"
                  type="text"
                />
              </div>
              <div>
                Amount Paid:{" "}
                <input
                  style={{
                    width: "60%",
                    background: " #F1F1F1 0% 0% no-repeat padding-box",
                    borderRadius: "5px",
                  }}
                  type="text"
                />
              </div>
              <div>
                Registration Id:{" "}
                <input
                  style={{
                    width: "60%",
                    background: " #F1F1F1 0% 0% no-repeat padding-box",
                    borderRadius: "5px",
                  }}
                  type="text"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5rem",
                padding: "4rem 0rem",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Download Receipt
              </Button>
              <Button
                sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Download Ticket
              </Button>
              <Button
                sx={{
                  background: "#0E436B",
                  borderRadius: "40px",
                  color: "white",
                  marginTop: "2rem",
                }}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
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
