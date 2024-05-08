// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import styles from "./speaker.module.css";
import axios from "axios";

import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";

// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const EditAttendees = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const UserEditAbleData = useSelector(
    (state) => state?.event?.attendeesEditData
  );
  const eventId = useSelector((state) => state?.event?.eventID);

  console.log("UserEditAbledata", UserEditAbleData);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;

  const [formData, setFormData] = useState({
    // State to hold form data
    firstName: UserEditAbleData?.attendee_user?.name,
    lastName: "",
    email: "",
    contact: "",
    organization: UserEditAbleData?.attendee_user?.organization_name,
    designation: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.firstName);
    formDataToSend.append("name", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("user_type", "Attendee");
    formDataToSend.append("location", formData.address);
    formDataToSend.append("organization_name", formData.organization);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("county_of_residence", formData.country);

    try {
      const response = await axios.patch(
        `${BASE_URL}/user/newattendees/
        ${UserEditAbleData.attendee_id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      // setFormData({
      //   speakerName: "",
      //   emailAddress: "",
      //   contactNumber: "",
      //   location: "",
      //   designation: "",
      //   organization: "",
      //   description: "",
      //   sessions: "",
      //   photo: {},
      //   personalWebsite: "",
      //   twitterLink: "",
      //   linkedInLink: "",
      // });
      toast.success("The attendee updated successfully");
      router.back();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>First Name</label>
          </div>
          <div>
            <input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Last Name</label>
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Email</label>
          </div>
          <div>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact</label>
          </div>
          <div>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange("contact")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Designation</label>
          </div>
          <div>
            <input
              type="text"
              id="designation"
              value={formData.designation}
              onChange={handleInputChange("designation")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Organization</label>
          </div>
          <div>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={handleInputChange("organization")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Address</label>
          </div>
          <div>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange("address")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>State</label>
          </div>
          <div>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleInputChange("state")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>City</label>
          </div>
          <div>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleInputChange("city")}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditAttendees;
