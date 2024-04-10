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

import { useRouter } from "next/router";
import { useRef, useState } from "react";
// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const AddSpeakerForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    // State to hold form data
    speakerName: "",
    emailAddress: "",
    contactNumber: "",
    location: "",
    designation: "",
    organization: "",
    description: "",
    sessions: "",
    photo:{},
    personalWebsite: "",
    twitterLink: "",
    linkedInLink: "",
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setFormData({ ...formData, photo:file });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form values:", formData);
    setFormData({
      speakerName: "",
      emailAddress: "",
      contactNumber: "",
      location: "",
      designation: "",
      organization: "",
      description: "",
      sessions: "",
      photo:{},
      personalWebsite: "",
      twitterLink: "",
      linkedInLink: "",
    });
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData);
      console.log("Data submitted successfully:", response.data);
      setFormData({
        speakerName: "",
        emailAddress: "",
        contactNumber: "",
        location: "",
        designation: "",
        organization: "",
        description: "",
        sessions: "",
        photo: {},
        personalWebsite: "",
        twitterLink: "",
        linkedInLink: "",
      });
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
            <label className={styles.label}>Speaker Name</label>
          </div>
          <div>
            <input
              type="text"
              id="speakerName"
              onChange={handleInputChange("speakerName")}
              value={formData.speakerName}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Email Address</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.emailAddress}
              id="emailAddress"
              onChange={handleInputChange("emailAddress")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact Number</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.contactNumber}
              id="contactNumber"
              onChange={handleInputChange("contactNumber")}
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
            <label className={styles.label}>Location</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.location}
              id="location"
              onChange={handleInputChange("location")}
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
              value={formData.designation}
              id="designation"
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
              value={formData.organization}
              id="organization"
              onChange={handleInputChange("organization")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.fullWidth}>
        <div>
          <label className={styles.label}>Description</label>
        </div>
        <div>
          <textarea
            type="text"
            value={formData.description}
            id="description"
            onChange={handleInputChange("description")}
            rows="6"
            className={styles.textarea}
          />
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
        <div className={styles.column} style={{ width: "48%" }}>
          <div>
            <label className={styles.label}>Sessions</label>
          </div>
          <div>
            <input
              placeholder="choose your sessions"
              className={styles.input}
              type="text"
              value={formData.sessions}
              id="sessions"
              onChange={handleInputChange("sessions")}
            />
          </div>
        </div>

        <div className={styles.column} style={{ width: "48%" }}>
          <div>
            <label className={styles.label}>Photo</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              accept="image/*"
              value={formData?.photo?.file?.name}
              id="photo"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
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
            <label className={styles.label}>Personal Website</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.personalWebsite}
              id="personalWebsite"
              onChange={handleInputChange("personalWebsite")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Twitter Link</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.twitterLink}
              id="twitterLink"
              onChange={handleInputChange("twitterLink")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>LinkedIn Link</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.linkedInLink}
              id="linkedInLink"
              onChange={handleInputChange("linkedInLink")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>{/* ... other divs */}</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSpeakerForm;
