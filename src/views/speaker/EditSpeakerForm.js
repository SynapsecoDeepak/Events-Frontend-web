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

const EditSpeakerForm = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const UserEditAbleData = useSelector(    (state) => state?.event?.speakerEditData);
  const eventId = useSelector((state) => state?.event?.eventID);



  console.log("UserEditAbledata", UserEditAbleData);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;

  const [formData, setFormData] = useState({
    // State to hold form data
    speakerName: UserEditAbleData.speaker_user.name,
    emailAddress: "",
    contactNumber: "",
    location: UserEditAbleData.location,
    designation: "",
    organization: UserEditAbleData.speaker_user.organization_name,
    description: UserEditAbleData.bio,
    sessions: "",
    photo: {},
    personalWebsite: "",
    twitterLink: "",
    linkedInLink: "",
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("speaker_user_name", formData.speakerName);
    formDataToSend.append("speaker_user",UserEditAbleData?.speaker_user?.id );
    formDataToSend.append("speaker_event", [eventId]);
    formDataToSend.append("speaker_user_email", formData.emailAddress);
    formDataToSend.append("session_speaker", formData.sessions);
    formDataToSend.append("speaker_user_profile_photo", formData.photo);
    formDataToSend.append("speaker_user_location", formData.location);
    formDataToSend.append("speaker_user_website", formData.personalWebsite);
    formDataToSend.append("speaker_user_twitter", formData.twitterLink);
    formDataToSend.append("speaker_user_linkdin", formData.linkedInLink);
    //  formDataToSend.append('expertise', formData.add);
    //  formDataToSend.append('added_by', formData.thumbnail);

    try {
      const response = await axios.patch(
        `${BASE_URL}/user/speakers/${UserEditAbleData.speaker_id}/`,  
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
      toast.success("The speaker updated successfully");
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

export default EditSpeakerForm;
